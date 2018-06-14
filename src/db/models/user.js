import mongoose from "mongoose";

import UserSchema from "../schemas/user";

UserSchema.statics.findByUsername = function(username, cb) {
    return this.find({ name }, cb);
};

UserSchema.statics.findByEmail = function(email, cb) {
    return this.find({ email }, cb);
};

UserSchema.virtual("getFullName").get(function() {
    const { first, middle, last } = this.name;
    return `${first} ${middle}${middle === "" ? "" : " "}${last}`;
});

export default mongoose.models("User", UserSchema);
