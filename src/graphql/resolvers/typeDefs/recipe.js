import Ingredient from "../../../db/models/ingredient";
import FoodFilterParameter from "../../../db/models/foodFilterParameter";
import Recipe from "../../../db/models/recipe";
import RecipeType from "../../../db/models/recipeType";
import Comment from "../../../db/models/comment";
import User from "../../../db/models/user";

const ingredient = async (obj, args, context, info) => {
    const ingredient = await Ingredient.getIngredientByID(obj.ingredient);
    if (ingredient) {
        return {
            ingredientID: ingredient._id,
            ...ingredient,
        };
    }
    return null;
};

const user = async (obj, args, context, info) => {
    const user = await User.getUser(obj.user);
    if (user) {
        return {
            userID: user._id,
            ...user,
        };
    }
    return null;
};

const reply = async (obj, args, context, info) => {
    return await Promise.all(
        obj.reply.map(async item => {
            const reply = await Comment.getCommentByID(item);
            if (reply) {
                return { commentID: reply._id, ...reply };
            }
            return null;
        })
    );
};

const type = async (obj, args, context, info) => {
    return await Promise.all(
        obj.type.map(async item => {
            const recipeType = await RecipeType.getRecipeTypeByID(item);
            if (recipeType) {
                return { recipeTypeID: recipeType._id, ...recipeType };
            }
            return null;
        })
    );
};

const specialitiesFilter = async (obj, args, context, info) => {
    return await Promise.all(
        obj.specialitiesFilter.map(async item => {
            const filter = await FoodFilterParameter.getFoodFilterParameterByID(item);
            if (filter) {
                return {
                    foodFilterParameterID: filter._id,
                    ...filter,
                };
            }
            return null;
        })
    );
};

const ingredients = async (obj, args, context, info) => {
    return obj.ingredients.map(item => {
        const { measurement, amount, ingredient } = item;
        return {
            ingredient,
            measurement,
            amount,
        };
    });
};

const steps = (obj, args, context, info) => {
    return obj.steps;
};

const associatedRecipes = async (obj, args, context, info) => {
    return await Promise.all(
        obj.associatedRecipes.map(async item => {
            const recipe = await Recipe.getRecipeByID(item);
            if (recipe) {
                return {
                    recipeID: recipe._id,
                    ...recipe,
                };
            }
            return null;
        })
    );
};

const comments = async (obj, args, context, info) => {
    return await Promise.all(
        obj.comments.map(async item => {
            const comment = await Comment.getCommentByID(item);
            if (comment) {
                return {
                    foodFilterParameterID: comment._id,
                    ...comment,
                };
            }
            return null;
        })
    );
};

export default {
    IngredientItem: {
        ingredient,
    },
    Comment: {
        user,
        reply,
    },
    Recipe: {
        type,
        specialitiesFilter,
        ingredients,
        steps,
        associatedRecipes,
        comments,
    },
};
