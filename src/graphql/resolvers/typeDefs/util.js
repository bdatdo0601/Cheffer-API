import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

//TODO: Change with momentjs

const Date = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
        return new Date(value); // value from the client
    },
    serialize(value) {
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    },
});

const Email = new GraphQLScalarType({
    name: "Email",
    description: "Email custom scalar type",
    serialize(value) {
        return value.toString();
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING && ast.value.match(EMAIL_REGEX)) {
            return ast.value;
        }
        return null;
    },
});

export default {
    Date,
    Email,
};
