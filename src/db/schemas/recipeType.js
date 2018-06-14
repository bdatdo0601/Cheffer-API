import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString, requiredDate } = variables;

const recipeTypeSchema = Schema({
    name: requiredString,
});

export default recipeTypeSchema;
