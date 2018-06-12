const ingredient = (obj, args, context, info) => {
    return {
        ingredientID: "sfs",
        name: "sf",
        synonyms: ["sf"],
        type: ["f"],
        group: ["fs"],
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
            measurement: "spoons",
        },
    ];
};

const steps = (obj, args, context, info) => {
    return [
        {
            summary: "sum",
            detailDescription: "details",
        },
    ];
};

const associatedRecipes = (obj, args, context, info) => {
    return [
        {
            recipeID: "id",
            name: "test",
            synonyms: ["124"],
            type: ["type"],
            specialitiesFilter: ["e"],
            ingredients: ["fa"],
            steps: ["fsf"],
            associatedRecipes: ["test"],
            comments: ["comments"],
            timeCreated: new Date(),
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

export default {
    IngredientItem: {
        ingredient,
    },
    Comment: {
        user,
        reply,
    },
    Recipe: {
        type,
        specialitiesFilter,
        ingredients,
        steps,
        associatedRecipes,
        comments,
    },
};
