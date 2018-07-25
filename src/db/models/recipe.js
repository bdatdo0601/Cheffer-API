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
    rating: Joi.number(),
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
        comments,
        rating,
    }) {
        try {
            const isRecipeExist = await this.findOne({ synonyms: name });
            if (isRecipeExist) return isRecipeExist;
            const typeList = await Promise.all(
                type.map(async item => {
                    const data = await RecipeType.createNewRecipeType({
                        name: item,
                    });
                    return data._id.toString();
                })
            );
            const specialitiesFilterList = await Promise.all(
                specialitiesFilter.map(async item => {
                    const data = await FoodFilterParameter.createNewFoodFilterParameter(item);
                    return data._id.toString();
                })
            );
            const ingredientList = await Promise.all(
                ingredients.map(async ingredient => {
                    const data = await Ingredient.createNewIngredient(ingredient.ingredient);
                    const { amount, measurement } = ingredient;
                    return { ingredient: data._id.toString(), amount, measurement };
                })
            );
            const documentInput = {
                name,
                synonyms: [...synonyms, name],
                type: typeList,
                specialitiesFilter: specialitiesFilterList,
                headerImage,
                ingredients: ingredientList,
                steps,
                associatedRecipes: associatedRecipes ? associatedRecipes : [],
                comments: comments ? comments : [],
                rating,
                timeCreated: new Date(),
            };
            const document = new Recipe(documentInput);
            const newRecipe = await this.insertOne(document);
            return newRecipe[0];
        } catch (err) {
            console.log(err);
        }
    }

    static async getRecipes({ name }) {
        const recipes = await this.find({ synonyms: name });
        return recipes;
    }

    static async getRecipeByID(id) {
        const recipe = await this.findById(id);
        return recipe;
    }
}

Recipe.collectionName = "Recipe";
Recipe.schema = recipeSchema;

export default Recipe;
