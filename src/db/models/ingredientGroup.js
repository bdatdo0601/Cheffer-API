import Joi from "joi";
import MongoModels from "mongo-models";

const ingredientGroupSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class IngredientGroup extends MongoModels {
    //interaction with db goes here
    static async createNewIngredientGroup({ name }) {
        const isGroupExist = await this.findOne({
            name: name.toLowerCase(),
        });
        if (isGroupExist) return isGroupExist;
        const documentInput = {
            name,
        };
        const document = new IngredientGroup(documentInput);
        const newIngredientGroup = await this.insertOne(document);
        return newIngredientGroup[0];
    }

    static async getIngredientGroup({ name }) {
        const ingredientGroup = await this.findOne({ name });
        return ingredientGroup;
    }

    static async getIngredientGroupByID(id) {
        const ingredientGroup = await this.findById(id);
        return ingredientGroup;
    }
}

IngredientGroup.collectionName = "IngredientGroup";
IngredientGroup.schema = ingredientGroupSchema;

export default IngredientGroup;
