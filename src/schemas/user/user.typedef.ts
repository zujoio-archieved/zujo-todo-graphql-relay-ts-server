import mongoose from "mongoose"

/**
 * Defination for comparing password
 */
export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

/**
 * Defination for authentication token
 */
export interface AuthToken {
    accessToken: string,
    kind: string
};

/**
 * Defination of User model
 */
export interface UserModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    email: string,
    password: string,
    passwordResetToken: string
    passwordResetExpires: Date,
  
    facebook: string,
    tokens: AuthToken[],
  
    profile: {
      name: string,
      gender: string,
      location: string,
      website: string,
      picture: string
    },
  
    comparePassword: comparePasswordFunction,
    gravatar: (size: number) => string
};