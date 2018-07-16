import Confidence from "confidence";
import dotenv from "dotenv";

dotenv.config();

const document = Object.freeze({
    logger: {
        $filter: "env",
        production: false,
        $default: true,
    },
    jwtSecret: process.env.jwtSecret,
    db: {
        mongo: {
            uri: {
                $filter: "env",
                production: process.env.MONGODB_URI,
                $default: "mongodb://localhost:27017/",
            },
            dbName: {
                $filter: "env",
                production: process.env.MONGODB_NAME,
                $default: "ChefferDB",
            },
        },
    },
    aws: {
        region: process.env.AWS_REGION,
        bucketName: process.env.BUCKET_NAME,
        bucketARN: process.env.AWS_BUCKET_ARN,
        accessID: process.env.AWS_ACCESS_KEY_ID,
        accessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const store = new Confidence.Store();

store.load(document);

const criteria = Object.freeze({
    env: process.env.NODE_ENV,
});

const retrieve = key => store.get(key, criteria);

export default {
    retrieve,
};
