import UserQueryResolver from "./user";

export default {
    Query: {
        ...UserQueryResolver,
    },
};
