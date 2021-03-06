import Joi from "joi";
import MongoModels from "mongo-models";

import Ingredient from "./ingredient";
import FoodFilterParameterType from "./foodFilterParameterType";

const foodFilterParameterSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    type: Joi.array().items(Joi.string()),
    restrictions: Joi.array().items(Joi.string()),
});

class FoodFilterParameter extends MongoModels {
    //interaction with DB here
    static async createNewFoodFilterParameter({ name, type, restrictions }) {
        const isAlreadyExist = await this.findOne({ name });
        if (isAlreadyExist) return isAlreadyExist;
        const restrictionsList = restrictions
            ? await Promise.all(
                  restrictions.map(async restriction => {
                      const ingredient = await Ingredient.createNewIngredient({ name: restriction });
                      return ingredient._id.toString();
                  })
              )
            : [];
        const typeList = type
            ? await Promise.all(
                  type.map(async item => {
                      const data = await FoodFilterParameterType.createNewFoodFilterParamType({ name: item });
                      return data._id.toString();
                  })
              )
            : [];
        const documentInput = {
            name,
            type: typeList,
            restrictions: restrictionsList,
        };

        const document = new FoodFilterParameter(documentInput);
        const newFoodFilterParameter = await this.insertOne(document);
        return newFoodFilterParameter[0];
    }

    static async getFoodFilterParameterByID(id) {
        const foodFilterParameter = await this.findById(id);
        return foodFilterParameter;
    }
}

FoodFilterParameter.collectionName = "FoodFilterParameter";
FoodFilterParameter.schema = foodFilterParameterSchema;

export default FoodFilterParameter;
