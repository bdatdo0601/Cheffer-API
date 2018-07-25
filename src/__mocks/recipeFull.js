export default Object.freeze([
    {
        name: "Bread Rolls",
        synonyms: ["little bread"],
        type: ["dinner", "american"],
        specialitiesFiltered: [
            {
                name: "peanut",
                type: "allergy",
                restrictions: ["peanuts", "almonds"],
            },
            {
                name: "dairy",
                type: "diet",
                restrictions: ["bread", "grains"],
            },
        ],
        ingredients: [
            {
                ingredient: "flour",
                amount: 1,
                measurement: "kg",
            },
            {
                ingredient: "sugar",
                amount: 1,
                measurement: "kg",
            },
        ],
        steps: [
            {
                summary: "put your left foot in",
            },
            {
                summary: "take your left foot out",
            },
        ],
        associatedRecipes: [],
        comments: [],
    },
]);
