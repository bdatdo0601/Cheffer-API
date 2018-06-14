import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString } = variables;

const foodFilterParameterTypeSchema = Schema({
    name: requiredString,
});

export default foodFilterParameterTypeSchema;
