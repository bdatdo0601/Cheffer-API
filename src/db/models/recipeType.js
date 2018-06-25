import Joi from "joi";
import MongoModels from "mongo-models";

const recipeTypeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class RecipeType extends MongoModels {
    //interaction with db
}

User.collectionName = "RecipeType";
User.schema = recipeTypeSchema;

export default RecipeType;
