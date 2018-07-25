import Joi from "joi";
import MongoModels from "mongo-models";

const foodFilterParameterTypeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
});

class FoodFilterParameterType extends MongoModels {
    //interaction with db here
    //interaction with db here
    static async createNewFoodFilterParamType({ name }) {
        const isTypeExist = await this.findOne({
            name: name.toLowerCase(),
        });
        if (isTypeExist) return isTypeExist;
        const documentInput = {
            name: name.toLowerCase(),
        };
        const document = new FoodFilterParameterType(documentInput);
        const newFoodFilterParamType = await this.insertOne(document);
        return newFoodFilterParamType[0];
    }

    static async getFoodFilterParamType({ name }) {
        const foodFilterParamType = await this.findOne({ name: name.toLowerCase() });
        return foodFilterParamType;
    }

    static async getFoodFilterParamTypeByID(id) {
        const foodFilterParamType = await this.findById(id);
        return foodFilterParamType;
    }
}

FoodFilterParameterType.collectionName = "FoodFilterParameterType";
FoodFilterParameterType.schema = foodFilterParameterTypeSchema;

export default FoodFilterParameterType;
