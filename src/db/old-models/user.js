import mongoose from "mongoose";
import Bcrypt from "bcrypt";

import UserSchema from "../schemas/user";

UserSchema.statics.findByEmail = async function(email, cb) {
    return await this.find({ email }, cb);
};

UserSchema.statics.getAllUser = async function(cb) {
    return await this.find({}, cb);
};

/**
 * userInfo object should contain name object, email, password
 */
UserSchema.statics.createUser = async function(userInfo, cb) {
    const { name, password, email } = userInfo;
    const isUserExist = await this.findByEmail(email);
    console.log(isUserExist);
    if (!isUserExist) return null;

    Bcrypt.hash(password, 10, async (err, hash) => {
        const user = {};
        user.name = name;
        user.email = email;
        user.password = hash;
        user.dateJoined = new Date();
        return await this.insert(user, cb);
    });
};

UserSchema.statics.verifyUser = async function(userCredential, cb) {
    const { email, password } = userCredential;
    const user = await UserSchema.statics.findByEmail(email);
    if (!user) return null;
    Bcrypt.compare(password, user.password, (err, res) => {
        if (!res) return null;
        return user;
    });
};

UserSchema.virtual("getFullName").get(function() {
    const { first, middle, last } = this.name;
    return `${first} ${middle}${middle === "" ? "" : " "}${last}`;
});

export default mongoose.model("User", UserSchema);
