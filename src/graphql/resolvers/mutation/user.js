import User from "../../../db/models/user";
import { createError } from "apollo-errors";

const UserAlreadyExistError = createError("UserAlreadyExist", { message: "User have already been in database" });

const createUserResolver = async (obj, args, context, info) => {
    const userInfo = args.input;

    const newUser = await User.createNewUser(userInfo);

    if (newUser) {
        return {
            userID: newUser._id,
            ...newUser,
        };
    } else {
        throw new UserAlreadyExistError();
    }
};

export default {
    createUser: createUserResolver,
};
