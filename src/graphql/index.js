import { join } from "path";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import resolvers from "./resolvers";

const typeDefs = importSchema(join(__dirname, "./schema/rootSchema.graphql"));

export default makeExecutableSchema({
    typeDefs,
    resolvers,
});
