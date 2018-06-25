import Joi from "joi";
import MongoModels from "mongo-models";

const ingredientSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    synonyms: Joi.array().items(Joi.string()),
    type: Joi.array().items(Joi.string()),
    group: Joi.array().item(Joi.string()),
});

class Ingredient extends MongoModels {
    //interaction with db here
}

Ingredient.collectionName = "Ingredient";
Ingredient.schema = ingredientSchema;

export default Ingredient;
