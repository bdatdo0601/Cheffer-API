import mongoose from "mongoose";
import UserSchema from "../schemas/user";

export default mongoose.model("Users", UserSchema);
