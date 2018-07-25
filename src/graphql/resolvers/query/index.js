import UserQueryResolver from "./user";
import RecipeQueryResolver from "./recipe";
import fs from "fs";
import { join } from "path";
import stream from "stream";

const files = (root, args, ctx, ops) => {
    // Return the record of files uploaded from your DB or API or filesystem.
    return [];
};

export default {
    Query: {
        ...UserQueryResolver,
        ...RecipeQueryResolver,
        uploads: files,
    },
};
