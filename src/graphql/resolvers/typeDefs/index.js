import FoodFilterParameterTypeDefs from "./foodFilterParameter";
import IngredientTypeDefs from "./ingredient";
import RecipeTypeDefs from "./recipe";
import UserTypeDefs from "./user";
import UtilTypeDefs from "./util";

export default {
    ...FoodFilterParameterTypeDefs,
    ...IngredientTypeDefs,
    ...RecipeTypeDefs,
    ...UserTypeDefs,
    ...UtilTypeDefs,
};
