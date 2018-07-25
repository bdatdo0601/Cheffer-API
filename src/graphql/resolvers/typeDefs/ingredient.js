import IngredientGroup from "../../../db/models/ingredientGroup";
import IngredientType from "../../../db/models/ingredientType";

const type = async (obj, args, context, info) => {
    return await Promise.all(
        obj.type.map(async item => {
            const ingredientType = await IngredientType.getIngredientTypeByID(item);
            if (ingredientType) {
                return { ingredientTypeID: ingredientType._id, ...ingredientType };
            }
            return null;
        })
    );
};

const group = async (obj, args, context, info) => {
    return await Promise.all(
        obj.type.map(async item => {
            const ingredientGroup = await IngredientGroup.getIngredientGroupByID(item);
            if (ingredientGroup) {
                return { ingredientGroupID: ingredientGroup._id, ...ingredientGroup };
            }
            return null;
        })
    );
};

export default {
    Ingredient: {
        type,
        group,
    },
};
