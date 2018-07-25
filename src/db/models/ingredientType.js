import Joi from "joi";
import MongoModels from "mongo-models";

const ingredientTypeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class IngredientType extends MongoModels {
    //interaction with db here
    static async createNewIngredientType({ name }) {
        const isTypeExist = await this.findOne({
            name: name.toLowerCase(),
        });
        if (isTypeExist) return isTypeExist;
        const documentInput = {
            name: name.toLowerCase(),
        };
        const document = new IngredientType(documentInput);
        const newIngredientType = await this.insertOne(document);
        return newIngredientType[0];
    }

    static async getNewIngredientType({ name }) {
        const ingredientType = await this.findOne({ name: name.toLowerCase() });
        return ingredientType;
    }
}

IngredientType.collectionName = "IngredientType";
IngredientType.schema = ingredientTypeSchema;

export default IngredientType;
