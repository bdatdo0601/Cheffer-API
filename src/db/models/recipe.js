import Joi from "joi";
import MongoModels from "mongo-models";

const recipeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    synonyms: Joi.array().items(Joi.string()),
    type: Joi.array().items(Joi.string()),
    specialitiesFilter: Joi.array().items(Joi.string()),
    ingredients: Joi.array().items(
        Joi.object({
            ingredient: Joi.string().required(),
            amount: Joi.number().required(),
            measurement: Joi.string().required(),
        })
    ),
    steps: Joi.array().items(
        Joi.object({
            summary: Joi.string().required(),
            detailDescription: Joi.string(),
        })
    ),
    associatedRecipes: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Joi.string()),
    timeCreated: Joi.date().required(),
});

class Recipe extends MongoModels {
    //interaction with db here
}

Recipe.collectionName = "Recipe";
Recipe.schema = recipeSchema;

export default Recipe;
