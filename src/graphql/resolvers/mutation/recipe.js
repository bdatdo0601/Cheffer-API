import Recipe from "../../../db/models/recipe";
import { createError } from "apollo-errors";

const uploadStreamToS3 = (S3, filename, cb) => {
    const pass = new stream.PassThrough();

    S3.upload(
        {
            Key: filename,
            Body: pass,
        },
        function(err, data) {
            console.log(err, data);
        }
    );

    return pass;
};

const createRecipeResolver = async (obj, args, context, info) => {
    const recipeInfo = args.input;
    const { headerImage } = args.input;
    //upload image here;
    let headerImageLink = headerImage.url;
    if (headerImage.file) {
        //upload file
        const { stream, filename, mimetype, encoding } = await headerImage.file;

        // 1. Validate file metadata.

        // 2. Stream file contents into local filesystem or cloud storage:
        // https://nodejs.org/api/stream.html
        stream.pipe(
            uploadStreamToS3(context.S3, filename, (err, data) => {
                if (err) throw new Error();
            })
        );
        headerImageLink = filename;
    }
    const newRecipe = await Recipe.createNewRecipe({ ...recipeInfo, headerImage: headerImageLink });
    if (newRecipe) {
        return { recipeID: newRecipe._id, ...newRecipe };
    } else {
        return null;
    }
};

export default {
    createRecipe: createRecipeResolver,
};
