import Joi from "joi";
import MongoModels from "mongo-models";

const commentSchema = Joi.object({
    _id: Joi.object(),
    user: Joi.string().required(),
    comment: Joi.string().required(),
    reply: Joi.array().items(Joi.object()),
    timeCreated: Joi.date().required(),
});

class Comment extends MongoModels {
    //Interaction with db here
    static async createNewComment({ userID, comment }) {
        const timeCreated = new Date();
        const documentInput = {
            user: userID,
            comment,
            reply: [],
            timeCreated: new Date(),
        };
        const document = new Comment(documentInput);
        const newComment = await this.insertOne(document);
        return newComment[0];
    }
}

Comment.collectionName = "Comment";
Comment.schema = commentSchema;

export default Comment;
