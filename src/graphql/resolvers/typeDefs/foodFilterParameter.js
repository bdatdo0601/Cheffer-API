const type = (obj, args, context, info) => {
    return {
        foodFilterParameterID: "1",
        name: "",
    };
};

const restrictions = (obj, args, context, info) => {
    return [
        {
            ingredientTypeID: "1",
            name: "",
        },
    ];
};

export default {
    FoodFilterParameter: {
        type,
        restrictions,
    },
};
