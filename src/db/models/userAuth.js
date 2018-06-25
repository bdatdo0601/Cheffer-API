import Joi from "joi";
import MongoModels from "mongo-models";

const userAuthSchema = Joi.object({
    _id: Joi.object(),
    userID: Joi.string().required(),
    jwtToken: Joi.string().required(),
    // expirationDate: Joi.date().required(),
});

class UserAuth extends MongoModels {
    //interaction here
    static async storeToken(userInfo) {
        const documentInput = {
            userID: userInfo.userID.toString(),
            jwtToken: userInfo.jwtToken,
        };
        const document = new UserAuth(documentInput);
        const newEntries = await this.insertOne(document);
        return newEntries[0];
    }

    static async getUserAuthByID(userID) {
        const data = await this.findOne({ userID });
        return data;
    }
}

UserAuth.collectionName = "UserAuth";
UserAuth.schema = userAuthSchema;

export default UserAuth;
