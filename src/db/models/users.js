import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString, requiredDate } = variables;

const userSchema = Schema({
    name: {
        first: requiredString,
        middle: String,
        last: requiredString,
    },
    email: requiredString,
    password: requiredString,
    dateJoined: requiredDate,
    foodFilterParams: [String],
    favoriteRecipes: [String],
    favoriteRecipeTypes: [String],
    viewedRecipe: [
        {
            recipeID: requiredString,
            dateViewed: requiredDate,
        },
    ],
    friends: [
        {
            user: requiredString,
            timeCreated: requiredDate,
        },
    ],
});
