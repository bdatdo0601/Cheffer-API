import { Schema } from "mongoose";

import { variables } from "../dbutil";

const { requiredString, requiredDate } = variables;

const commentSchema = Schema({
    user: requiredString,
    comment: requiredString,
    reply: [String],
    timeCreated: requiredDate,
});

export default commentSchema;
