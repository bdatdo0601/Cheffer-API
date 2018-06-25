import Joi from "joi";
import MongoModels from "mongo-models";

const ingredientTypeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required,
});

class IngredientType extends MongoModels {
    //interaction with db here
}

IngredientType.collectionName = "IngredientType";
IngredientType.schema = ingredientTypeSchema;

export default IngredientType;
