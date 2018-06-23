import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString } = variables;

const ingredientGroupSchema = Schema({
    name: requiredString,
});

export default ingredientGroupSchema;
