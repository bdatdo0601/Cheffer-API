import MongoModels from "mongo-models";
import User from "./db/models/user";
import UserAuth from "./db/models/userAuth";

// Configuration data
import configStore from "./config";

const dbInfo = {
    uri: configStore.retrieve("/db/mongo/uri"),
    db: configStore.retrieve("/db/mongo/dbName"),
};

const main = async function() {
    try {
        await MongoModels.connect(
            dbInfo,
            {}
        );
        User.deleteMany({});
        UserAuth.deleteMany({});
        const user = await User.createNewUser({
            name: { first: "Dat", middle: "Bac", last: "Do" },
            password: "root",
            email: "dod2@wit.edu",
        });
        const verifyUser = await User.verifyUser({
            email: "dod2@wit.edu",
            password: "root",
        });
        await UserAuth.storeToken({ userID: verifyUser._id, jwtToken: "000" });
        console.log("Root Created: Verify success");
        await MongoModels.disconnect();
    } catch (err) {
        console.log(err.message);
    }
};

main();
