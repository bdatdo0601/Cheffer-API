import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString } = variables;

const ingredientTypeSchema = Schema({
    name: requiredString,
});

export default ingredientTypeSchema;
