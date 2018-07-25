import { createError } from "apollo-errors";
import Recipe from "../../../db/models/recipe";

const RecipeNotFoundError = createError("RecipeNotFoundError", {
    message: "Recipe not found in database",
});

const getRecipesResolver = async (obj, args, context, info) => {
    const recipes = await Recipe.find({});
    return recipes.map(recipe => ({
        recipeID: recipe._id.toString(),
        ...recipe,
    }));
};

const getRecipeByID = async (obj, args, context, info) => {
    const recipe = await Recipe.getRecipeByID(args.input.recipeID);
    if (recipe) {
        return {
            ...recipe,
            recipeID: args.input.recipeID,
        };
    }
    return null;
};

export default {
    getRecipes: getRecipesResolver,
    getRecipeByID,
};
