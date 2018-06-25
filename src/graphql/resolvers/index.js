import QueryResolvers from "./query";
import MutationResolvers from "./mutation";
import TypeResolvers from "./typeDefs";

//Resolver will take in arguments with (rootValuve, arguments, context, operations)

export default {
    ...QueryResolvers,
    ...MutationResolvers,
    ...TypeResolvers,
};
