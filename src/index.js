import Fastify from "fastify";
import { GraphQLError } from "graphql";
import { formatError } from "apollo-errors";
import fastifyJWTPlugin from "fastify-jwt";
import MongoModels from "mongo-models";

//AWS
import AWS from "aws-sdk";

// Configuration data
import configStore from "./config";

// Database
import Loader from "./dbLoader";

//Plugins
import GraphQLFastifyPlugin from "./plugins/graphql";
import VoyagerFastifyPlugin from "./plugins/voyager";

import Errors from "./graphql/errors";
import Schema from "./graphql";

const loggerConfig = {
    level: "info",
    prettyPrint: true,
};

const dbInfo = {
    uri: `${configStore.retrieve("/db/mongo/uri")}${configStore.retrieve("/db/mongo/dbName")}`,
};

const fastify = Fastify({
    logger: configStore.retrieve("/logger") ? loggerConfig : false,
});

AWS.config.update({ region: configStore.retrieve("/aws/region") });
const S3 = new AWS.S3({
    params: {
        Bucket: configStore.retrieve("/aws/bucketName"),
    },
});

const errorFormatter = error => {
    let e = formatError(error);
    if (e instanceof GraphQLError) {
        e = formatError(
            new Errors.UnknownError({
                data: {
                    originalMessage: e.message,
                    originalError: e.name,
                },
            })
        );
    }

    return e;
};

fastify
    .register(fastifyJWTPlugin, {
        secret: configStore.retrieve("/jwtSecret"),
    })
    .after(err => {
        if (err) throw err;
        fastify.register(GraphQLFastifyPlugin, {
            query: {
                schema: Schema,
                graphiql: true,
                formatError: errorFormatter,
                context: {
                    Loader,
                    JWTUtils: fastify.jwt,
                    S3,
                },
            },
            route: {
                path: "/graphql",
            },
        });
        fastify.register(VoyagerFastifyPlugin, {
            route: {
                path: "/voyager",
            },
            voyagerOptions: {
                endpointUrl: "/graphql",
            },
        });
    });

// Run the server!
const start = async () => {
    console.log(dbInfo);
    try {
        await MongoModels.connect(
            dbInfo,
            {}
        );
        await fastify.listen(process.env.PORT || 5000, "0.0.0.0");

        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        console.error(err);
        fastify.log.error(err);
        try {
            await MongoModels.disconnect();
        } catch (err) {
            fastify.log.error(err);
        }
        process.exit(1);
    }
};
start();
