import UserMutationResolver from "./user";
import RecipeMutationResolver from "./recipe";

// import fs from "fs";

// const uploadStreamToS3 = (S3, filename, cb) => {
//     const pass = new stream.PassThrough();

//     S3.upload(
//         {
//             Key: filename,
//             Body: pass,
//         },
//         function(err, data) {
//             console.log(err, data);
//         }
//     );

//     return pass;
// };

// const singleUpload = async (parent, { file }, ctx, ops) => {
//     const { stream, filename, mimetype, encoding } = await file;

//     // 1. Validate file metadata.

//     // 2. Stream file contents into local filesystem or cloud storage:
//     // https://nodejs.org/api/stream.html
//     stream.pipe(
//         uploadStreamToS3(ctx.S3, filename, (err, data) => {
//             if (err) throw new Error();
//         })
//     );

//     // 3. Record the file upload in your DB.
//     // const id = await recordFile( … )

//     return {
//         stream,
//         filename,
//         mimetype,
//         encoding,
//     };
// };

export default {
    Mutation: {
        ...RecipeMutationResolver,
        ...UserMutationResolver,
    },
};
