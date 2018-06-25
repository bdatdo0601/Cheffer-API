import User from "../../../db/models/user";
import { createError } from "apollo-errors";

const UserNotFoundError = createError("UserNotFound", { message: "User is not found in database" });

const getUsersResolver = async (obj, args, context, info) => {
    const users = await User.find({});
    return users.map(user => ({ userID: user._id, ...user }));
};

const getUserByIDResolver = async (obj, args, context, info) => {
    const { id } = args.input;
    const user = await User.findById(id);
    if (user) {
        return {
            userID: user._id,
            ...user,
        };
    } else throw new UserNotFoundError();
};

export default {
    getUserByID: getUserByIDResolver,
    getUsers: getUsersResolver,
};
