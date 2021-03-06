const user = (obj, args, context, info) => {
    return {
        userID: "12",
        name: {
            first: "test",
            middle: "yo",
            last: "lo",
        },
        email: "a@b.c",
        password: "secret",
        dateJoined: new Date(),
        foodFilterParams: ["12", "2", "12"],
        favoriteRecipes: ["12d", "1f", "f2"],
        favoriteRecipeTypes: ["af", "fas", "asf"],
        viewedRecipes: ["af", "asf", "fasf"],
        friends: [
            {
                user: "asf",
                timeCreated: new Date(),
            },
        ],
    };
};

const recipe = (obj, args, context, info) => {
    return {
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
    };
};

const name = (obj, args, context, info) => {
    console.log(obj);
    return obj.name;
};

const foodFilterParams = (obj, args, context, info) => {
    return [
        {
            foodFilterParameterID: "124",
            name: "",
            type: "asf",
            restrictions: ["asf", "asf"],
        },
    ];
};

const favoriteRecipes = (obj, args, context, info) => {
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

const favoriteRecipeTypes = (obj, args, context, info) => {
    return [
        {
            recipeTypeID: "sf",
            name: "asfa",
        },
    ];
};

const viewedRecipes = async (obj, args, context, info) => {
    return await Promise.all(
        obj.viewedRecipes.map(async item => {
            const recipe = await Recipe.getRecipeByID(item);
            if (recipe) {
                return {
                    recipeID: recipe._id,
                    ...recipe,
                };
            }
            return null;
        })
    );
};

const friends = (obj, args, context, info) => {
    return [
        {
            user: "af",
            timeCreated: new Date(),
        },
    ];
};

export default {
    Friend: {
        user,
    },
    ViewedRecipe: {
        recipe,
    },
    User: {
        name,
        foodFilterParams,
        favoriteRecipes,
        favoriteRecipeTypes,
        viewedRecipes,
        friends,
    },
};
