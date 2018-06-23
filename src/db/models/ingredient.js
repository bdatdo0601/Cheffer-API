import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString } = variables;

const ingredientSchema = Schema({
    name: requiredString,
    synonyms: [String],
    type: [String],
    group: [String],
});

export default ingredientSchema;
