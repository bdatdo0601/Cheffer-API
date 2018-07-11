import User from "../../../db/models/user";
import UserAuth from "../../../db/models/userAuth";
import { createError } from "apollo-errors";

const UserNotFoundError = createError("UserNotFound", {
    message: "User is not found in database",
});
const UserAuthenticationError = createError("UserAuthenticationError", {
    message: "User authentication error",
});
const UserActivationError = createError("UserActivationError", {
    message: "User is not activated",
});

const loginResolver = async (obj, args, context, info) => {
    const userCredential = args.input;
    const verifyUser = await User.verifyUser(userCredential);
    if (verifyUser) {
        const userAuth = await UserAuth.getUserAuthByID(verifyUser._id.toString());
        if (userAuth) {
            return {
                userID: verifyUser._id,
                ...verifyUser,
                jwtToken: userAuth.jwtToken,
            };
        } else throw new UserActivationError();
    } else throw new UserAuthenticationError();
};

const getUsersResolver = async (obj, args, context, info) => {
    const users = await User.find({});
    return users.map(user => ({
        userID: user._id,
        ...user,
    }));
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
    login: loginResolver,
    getUserByID: getUserByIDResolver,
    getUsers: getUsersResolver,
};
