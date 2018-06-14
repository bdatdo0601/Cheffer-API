import mongoose from "mongoose";

// Configuration data
import configStore from "../config";

const getDB = async function() {
    try {
        await mongoose.connect(`${configStore.retrieve("/db/mongo/uri")}${configStore.retrieve("/db/mongo/dbName")}`);
        const db = await mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        return db;
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

export default getDB();
