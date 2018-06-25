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
}

Comment.collectionName = "Comment";
Comment.schema = commentSchema;

export default Comment;
