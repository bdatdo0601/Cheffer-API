import User from "../../../db/models/user";
import UserAuth from "../../../db/models/userAuth";
import { createError } from "apollo-errors";

const UserAlreadyExistError = createError("UserAlreadyExist", { message: "User have already been in database" });

const createUserResolver = async (obj, args, context, info) => {
    const userInfo = args.input;
    const { JWTUtils } = context;
    const newUser = await User.createNewUser(userInfo);
    if (newUser) {
        const jwtToken = JWTUtils.sign({ userID: newUser._id, email: newUser.email });
        const userAuthData = await UserAuth.storeToken({ userID: newUser._id, jwtToken });
        return {
            userID: newUser._id,
            ...newUser,
            jwtToken,
        };
    } else {
        throw new UserAlreadyExistError();
    }
};

export default {
    createUser: createUserResolver,
};
