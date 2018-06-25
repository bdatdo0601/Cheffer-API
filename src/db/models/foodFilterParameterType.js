import Joi from "joi";
import MongoModels from "mongo-models";

const foodFilterParameterTypeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class FoodFilterParameterType extends MongoModels {
    //interaction with db here
}

FoodFilterParameterType.collectionName = "FoodFilterParameterType";
FoodFilterParameterType.schema = foodFilterParameterTypeSchema;

export default FoodFilterParameterType;
