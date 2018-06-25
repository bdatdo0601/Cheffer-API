import Joi from "joi";
import MongoModels from "mongo-models";

const foodFilterParameterSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    type: Joi.array().items(Joi.string()),
    restrictions: Joi.array().items(Joi.string()),
});

class FoodFilterParameter extends MongoModels {
    //interaction with DB here
}

FoodFilterParameter.collectionName = "FoodFilterParameter";
FoodFilterParameter.schema = foodFilterParameterSchema;

export default FoodFilterParameter;
