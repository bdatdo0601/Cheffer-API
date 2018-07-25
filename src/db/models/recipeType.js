import Joi from "joi";
import MongoModels from "mongo-models";

const recipeTypeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class RecipeType extends MongoModels {
    //interaction with db
    //interaction with db here
    static async createNewRecipeType({ name }) {
        const isTypeExist = await this.findOne({
            name: name.toLowerCase(),
        });
        if (isTypeExist) return isTypeExist;
        const documentInput = {
            name: name.toLowerCase(),
        };
        const document = new RecipeType(documentInput);
        const newRecipeType = await this.insertOne(document);
        return newRecipeType[0];
    }

    static async getNewRecipeType({ name }) {
        const recipeType = await this.findOne({ name: name.toLowerCase() });
        return recipeType;
    }
}

RecipeType.collectionName = "RecipeType";
RecipeType.schema = recipeTypeSchema;

export default RecipeType;
