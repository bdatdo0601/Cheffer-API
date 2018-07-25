import Joi from "joi";
import MongoModels from "mongo-models";

import RecipeType from "./recipeType";
import FoodFilterParameter from "./foodFilterParameter";
import Ingredient from "./ingredient";

const recipeSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    synonyms: Joi.array().items(Joi.string()),
    type: Joi.array().items(Joi.string()),
    specialitiesFilter: Joi.array().items(Joi.string()),
    headerImage: Joi.string(),
    ingredients: Joi.array().items(
        Joi.object({
            ingredient: Joi.string().required(),
            amount: Joi.number().required(),
            measurement: Joi.string().required(),
        })
    ),
    steps: Joi.array().items(
        Joi.object({
            summary: Joi.string().required(),
            detailDescription: Joi.string(),
        })
    ),
    associatedRecipes: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Joi.string()),
    timeCreated: Joi.date().required(),
});

class Recipe extends MongoModels {
    //interaction with db here
    static async createNewRecipe({
        name,
        synonyms,
        type,
        specialitiesFilter,
        headerImage,
        ingredients,
        steps,
        associatedRecipes,
    }) {
        const isRecipeExist = await this.findOne({ synonyms: name });
        if (isRecipeExist) return isRecipeExist;
        const typeList = type.map(async item => {
            const data = await RecipeType.createNewRecipeType({
                name: item,
            });
            return data._id;
        });
        const specialitiesFilterList = specialitiesFilter.map(async item => {
            const data = await FoodFilterParameter.createNewFoodFilterParameter(item);
            return data._id;
        });
        const ingredientList = ingredients.map(async ingredient => {
            const data = await Ingredient.createNewIngredient(ingredient.ingredient);
            const { amount, measurement } = ingredient;
            return { ingredient: data._id, amount, measurement };
        });
        const documentInput = {
            name,
            synonyms: [...synonyms, name],
            type: typeList,
            specialitiesFilter: specialitiesFilterList,
            headerImage,
            ingredients: ingredientList,
            steps,
            associatedRecipes,
        };
        const document = new Recipe(documentInput);
        const newRecipe = await this.insertOne(document);
        return newRecipe[0];
    }

    static async getRecipes({ name }) {
        const recipes = await this.find({ synonyms: name });
        return recipes;
    }
}

Recipe.collectionName = "Recipe";
Recipe.schema = recipeSchema;

export default Recipe;
