import Joi from "joi";
import Bcrypt from "bcrypt";
import MongoModels from "mongo-models";

const userSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.object({
        first: Joi.string().required(),
        middle: Joi.string(),
        last: Joi.string().required(),
    }),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    dateJoined: Joi.date().required(),
    foodFilterParams: Joi.array().items(Joi.string()),
    favoriteRecipes: Joi.array().items(Joi.string()),
    favoriteRecipeTypes: Joi.array().items(Joi.string()),
    viewedRecipes: Joi.array().items(
        Joi.object({
            recipeID: Joi.string().required(),
            dateViewed: Joi.date().required(),
        })
    ),
    friends: Joi.array().items(
        Joi.object({
            user: Joi.string().required(),
            timeCreated: Joi.date().required(),
        })
    ),
});

class User extends MongoModels {
    static async createNewUser(userInfo) {
        const { name, password, email } = userInfo;
        const isUserExist = await this.findOne({
            email,
        });
        if (isUserExist) return null;
        const hashedPassword = await new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, async (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
        const documentInput = {
            name,
            email,
            password: hashedPassword,
            dateJoined: new Date(),
            foodFilterParams: [],
            favoriteRecipes: [],
            viewedRecipes: [],
            friends: [],
        };
        const document = new User(documentInput);
        const newUser = await this.insertOne(document);
        return newUser[0];
    }

    static async verifyUser(userCredential) {
        const { email, password } = userCredential;
        const user = await this.findOne({
            email,
        });
        if (!user) return null;
        const isPasswordMatch = await new Promise((resolve, reject) => {
            Bcrypt.compare(password, user.password, (err, res) => {
                resolve(res);
            });
        });
        if (!isPasswordMatch) return null;
        return user;
    }

    static async getAllUser() {
        return await this.find({});
    }

    static async getUserByID(id) {
        const user = await this.findById(id);
        return user;
    }
}

User.collectionName = "User";
User.schema = userSchema;

export default User;
