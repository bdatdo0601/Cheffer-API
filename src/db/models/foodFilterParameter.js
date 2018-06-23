import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString } = variables;

const foodFilterParameterSchema = Schema({
    name: requiredString,
    type: [String],
    restrictions: [String],
});

export default foodFilterParameterSchema;
