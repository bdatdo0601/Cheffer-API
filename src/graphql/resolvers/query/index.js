const helloResolver = async (rootValue, args, context, operations) => {
    return "world";
};

const fullNameResolver = async (rootValue, args, context, operations) => {
    return {
        first: "Dat",
        middle: "B",
        last: "Prytherch",
    };
};

export default {
    Query: {
        hello: helloResolver,
        fullName: fullNameResolver,
    },
};
