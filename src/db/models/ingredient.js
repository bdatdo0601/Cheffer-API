import Joi from "joi";
import MongoModels from "mongo-models";
import IngredientGroup from "./ingredientGroup";
import IngredientType from "./ingredientType";

const ingredientSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    synonyms: Joi.array().items(Joi.string()),
    type: Joi.array().items(Joi.string()),
    group: Joi.array().items(Joi.string()),
});

class Ingredient extends MongoModels {
    //interaction with db here
    static async createNewIngredient({ name, synonyms, type, group }) {
        const isIngredientExist = await this.findOne({ synonyms: name });
        if (isIngredientExist) return isIngredientExist;
        const groupList = group
            ? await Promise.all(
                  group.map(async item => {
                      const data = await IngredientGroup.createNewIngredientGroup({ name: item });
                      return data._id;
                  })
              )
            : [];
        const typeList = type
            ? await Promise.all(
                  type.map(async item => {
                      const data = await IngredientType.createNewIngredientType({ name: item });
                      return data._id;
                  })
              )
            : [];
        const documentInput = {
            name,
            synonyms: synonyms ? [...synonyms, name] : [name],
            group: groupList,
            type: typeList,
        };
        const document = new Ingredient(documentInput);
        const ingredient = await this.insertOne(document);
        return ingredient[0];
    }

    static async getIngredients({ name, group, type }) {
        const ingredients = await this.find({ synonyms: name, group, type });
        return ingredients;
    }

    static async getIngredientByID(id) {
        const ingredient = await this.findById(id);
        return ingredient;
    }
}

Ingredient.collectionName = "Ingredient";
Ingredient.schema = ingredientSchema;

export default Ingredient;
