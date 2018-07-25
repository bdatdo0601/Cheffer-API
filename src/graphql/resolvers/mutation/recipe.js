import Recipe from "../../../db/models/recipe";
import { createError } from "apollo-errors";

const createRecipeResolver = async (obj, args, context, info) => {
    const userInfo = args.input;
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
