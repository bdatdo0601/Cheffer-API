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

const userResolver = () => {
    return {
        userID: "userID",
        name: {
            first: "d",
            middle: "b",
            last: "d",
        },
        email: "test@test.com",
        password: "123456",
        dateJoined: new Date(),
        foodFilterParams: ["id1", "id2", "id3"],
        favoriteRecipes: ["1", "2", "3"],
        favoriteRecipeTypes: ["1", "2", "3"],
        viewedRecipes: ["1", "2", "3"],
        friends: [
            {
                user: "yolo",
                timeCreated: new Date(),
            },
        ],
    };
};

export default {
    Query: {
        hello: helloResolver,
        fullName: fullNameResolver,
        getUser: userResolver,
    },
};
