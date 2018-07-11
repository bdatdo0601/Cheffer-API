import Recipe from "../../../db/models/recipe";
import { createError } from "apollo-errors";

const RecipeNotFoundError = createError("RecipeNotFoundError", {
    message: "Recipe not found in database",
});
