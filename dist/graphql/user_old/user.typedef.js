"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const AuthTokenType = new graphql_1.GraphQLObjectType({
    name: "AuthToken",
    description: "This represent a Auth Token",
    fields: () => ({
        kind: {
            type: graphql_1.GraphQLString,
            resolve: (authToken) => authToken.kind
        },
        accessToken: {
            type: graphql_1.GraphQLString,
            resolve: (authToken) => authToken.accessToken
        },
    })
});
exports.AuthTokenType = AuthTokenType;
/**
 * User Profile Defination
 */
const UserProfileType = new graphql_1.GraphQLObjectType({
    name: "UserProfile",
    description: "This represent a User Profile",
    fields: () => ({
        name: {
            type: graphql_1.GraphQLString,
            resolve: (profile) => profile.name
        },
        gender: {
            type: graphql_1.GraphQLString,
            resolve: (profile) => profile.gender
        },
        location: {
            type: graphql_1.GraphQLString,
            resolve: (profile) => profile.location
        },
        website: {
            type: graphql_1.GraphQLString,
            resolve: (profile) => profile.website
        },
        picture: {
            type: graphql_1.GraphQLString,
            resolve: (profile) => profile.picture
        }
    })
});
exports.UserProfileType = UserProfileType;
/**
 * User Type Defination
 */
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    description: "This represent a User",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            resolve: (user) => user._id
        },
        email: {
            type: graphql_1.GraphQLString,
            resolve: (user) => user.email
        },
        password: {
            type: graphql_1.GraphQLString,
            resolve: (user) => user.password
        },
        passwordResetToken: {
            type: graphql_1.GraphQLString,
            resolve: (user) => user.passwordResetToken
        },
        passwordResetExpires: {
            type: graphql_1.GraphQLString,
            resolve: (user) => user.passwordResetExpires
        },
        profile: {
            type: UserProfileType,
            resolve: (user) => user.profile
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: (user) => user.createdAt,
        },
        updatedAt: {
            type: graphql_1.GraphQLString,
            resolve: (user) => user.updatedAt,
        },
    })
});
exports.UserType = UserType;
/**
 * Input definition for User Profile
 */
const CreateProfileInput = new graphql_1.GraphQLInputObjectType({
    name: "CreateProfile",
    description: "This represent a Update Profile input",
    fields: () => ({
        name: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        gender: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        location: {
            type: graphql_1.GraphQLString
        },
        website: {
            type: graphql_1.GraphQLString
        },
        picture: {
            type: graphql_1.GraphQLString
        }
    })
});
/**
 * Input definition for User Profile
 */
const UpdateProfileInput = new graphql_1.GraphQLInputObjectType({
    name: "UpdateProfileInput",
    description: "This represent a Update Profile input",
    fields: () => ({
        name: {
            type: graphql_1.GraphQLString
        },
        gender: {
            type: graphql_1.GraphQLString
        },
        location: {
            type: graphql_1.GraphQLString
        },
        website: {
            type: graphql_1.GraphQLString
        },
        picture: {
            type: graphql_1.GraphQLString
        }
    })
});
/**
 * Create User Input Defination
 */
const CreateUserInput = new graphql_1.GraphQLInputObjectType({
    name: "CreateUser",
    description: "This represent a Create User Input",
    fields: () => ({
        email: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        password: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        profile: {
            type: CreateProfileInput,
        }
    })
});
exports.CreateUserInput = CreateUserInput;
/**
 * Update User Input Def
 */
const UpdateUserInput = new graphql_1.GraphQLInputObjectType({
    name: "UpdateUserInput",
    description: "This represent a Update User Input",
    fields: () => ({
        email: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        profile: {
            type: UpdateProfileInput,
        }
    })
});
exports.UpdateUserInput = UpdateUserInput;
const DeleteUserInput = new graphql_1.GraphQLInputObjectType({
    name: "DeleteUserInput",
    description: "This represent a Update User Input",
    fields: () => ({
        email: {
            type: graphql_1.GraphQLString
        },
        id: {
            type: graphql_1.GraphQLID
        }
    })
});
exports.DeleteUserInput = DeleteUserInput;
const AuthPayload = new graphql_1.GraphQLObjectType({
    name: "AuthPayload",
    description: "This represent a Create User Input Type",
    fields: () => ({
        token: {
            type: AuthTokenType
        },
        user: {
            type: UserType
        },
    })
});
exports.AuthPayload = AuthPayload;
/**
 * User object
 */
class User extends Object {
}
exports.User = User;
//# sourceMappingURL=user.typedef.js.map