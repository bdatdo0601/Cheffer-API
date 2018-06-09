const ingredient = (obj, args, context, info) => {
    return {
        ingredient: "test",
        amount: 2.0,
    };
};

const user = (obj, args, context, info) => {
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

const specialitiesFilter = (obj, args, context, info) => {
    return [
        {
            foodFilterParameterID: "test",
            name: "test",
            type: "foodFilterParamTypeID",
            restrictions: ["tet", "tes"],
        },
    ];
};

const ingredients = (obj, args, context, info) => {
    return [
        {
            ingredient: "test",
            amount: 2.2,
        },
    ];
};

const reply = (obj, args, context, info) => {
    return [
        {
            commentID: "test",
            user: "userID",
            comment: "test",
            reply: ["test1", "test2", "test3"],
            timeCreated: new Date(),
        },
    ];
};

const type = (obj, args, context, info) => {
    return [
        {
            recipeTypeID: "test",
            name: "yolo",
        },
    ];
};

const comments = (obj, args, context, info) => {
    return [
        {
            commentID: "test",
            user: "userID",
            comment: "test",
            reply: ["test1", "test2", "test3"],
            timeCreated: new Date(),
        },
    ];
};
