import User from "../../../db/models/user";
import { createError } from "apollo-errors";

const UserAlreadyExistError = createError("UserAlreadyExist", { message: "User have already been in database" });

const createUserResolver = async (obj, args, context, info) => {
    const userInfo = args.input;

    const newUser = await User.createNewUser(userInfo);
    if (newUser) {
        const user = newUser[0];
        return {
            userID: user._id,
            ...user,
        };
    } else {
        throw new UserAlreadyExistError();
    }
};

export default {
    createUser: createUserResolver,
};
