import Joi from "joi";
import MongoModels from "mongo-models";

const ingredientGroupSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class IngredientGroup extends MongoModels {
    //interaction with db goes here
}

IngredientGroup.collectionName = "IngredientGroup";
IngredientGroup.schema = ingredientGroupSchema;

export default IngredientGroup;
