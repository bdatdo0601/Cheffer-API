import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString, requiredDate, requiredNumber } = variables;

const recipeSchema = Schema({
    name: requiredString,
    synonums: [String],
    type: [String],
    specialitiesFilter: [String],
    ingredients: [
        {
            ingredient: requiredString,
            amount: requiredNumber,
            measurement: requiredString,
        },
    ],
    steps: [
        {
            summary: requiredString,
            detailDescription: String,
        },
    ],
    associatedRecipes: [String],
    comments: [String],
    timeCreated: requiredDate,
});

export default recipeSchema;
