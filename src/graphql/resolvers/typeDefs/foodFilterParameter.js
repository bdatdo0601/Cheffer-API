const restrictions = (obj, args, context, info) => {
    return [
        {
            ingredientTypeID: "1",
            name: "",
        },
    ];
};

const type = (obj, args, context, info) => {
    return {
        foodFilterParameterID: "1",
        name: "",
    };
};
