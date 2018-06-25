import UserMutationResolver from "./user";

export default {
    Mutation: {
        ...UserMutationResolver,
    },
};
