import FoodFilterParameterType from "../../../db/models/foodFilterParameterType";
import Ingredient from "../../../db/models/ingredient";

const type = async (obj, args, context, info) => {
    return await Promise.all(
        obj.type.map(async item => {
            const foodFilterParamType = await FoodFilterParameterType.getFoodFilterParamTypeByID(item);
            if (foodFilterParamType) {
                return { foodFilterParameterTypeID: foodFilterParamType._id, ...foodFilterParamType };
            }
            return null;
        })
    );
};

const restrictions = async (obj, args, context, info) => {
    return await Promise.all(
        obj.restrictions.map(async item => {
            const ingredient = await Ingredient.getIngredientByID(item);
            if (ingredient) {
                return { ingredientID: ingredient._id, ...ingredient };
            }
            return null;
        })
    );
};

export default {
    FoodFilterParameter: {
        type,
        restrictions,
    },
};
