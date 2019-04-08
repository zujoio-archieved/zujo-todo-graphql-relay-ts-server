import lodash from "lodash"

import { UserValidation } from "./user.validation"
import { Encryption } from "../../common/utils/common.encryption"
import { JWT } from "../../common/utils/common.jwt"
import { User } from "../../schemas/user"
import { USER_TOKEN_KIND } from "../../common/utils/common.constant"
import { convertToObjectId } from "../../schemas/utils"
import { EmailAlreadyExists } from '../../common/utils/common.exceptions'
import {sendMail} from '../../common/mailer/mailer';
import { UserLoader } from "../../loaders/user.loaders";


class UserRepository{
    private _loader:UserLoader = new UserLoader()

    /**
     * Login user with credentials
     * @param email email address of user
     * @param password password of user
     */
    async login(email: string, password: string){
         // Find user
         const where = {
            email: email
        }
        let user = await User.findOne(where)
        if(!user){
            throw new Error("User not found!")
        }

        if(await Encryption.compareHash(password, user.password)){
            const token = await JWT.generateToken(user._id.toHexString())
            const AuthToken = {
                kind: USER_TOKEN_KIND.session,
                accessToken: token
            }
            user.tokens.push(AuthToken)

            // Save User
            const savedUser = await user.save();
            return {
                authToken: AuthToken,
                user: savedUser.toJSON()
            }
        }
        else{
            throw Error("Failed to login, Invalid Password!")
        }
    }

    /**
     * Register User
     * @param userPayload User input payload
     * @returns Object contains new created user and authentication token
     */
    async register(userPayload:any){
        // Validate unique parameters
        const isEmailAlreadyExists =await UserValidation.emailAlreadyExists(userPayload.email)
        if(isEmailAlreadyExists){
            throw new EmailAlreadyExists()
        }

       
        // Create User
        const user = new User({
            email: userPayload.email,
            password: userPayload.password,
            /*
            profile:{
                name: userPayload.profile.name,
                gender: userPayload.profile.gender,
                location: userPayload.profile.location,
                website: userPayload.profile.website,
                picture: userPayload.profile.picture,
            }
            */
        })

        // Generate and assign token to created user
        const token = await JWT.generateToken(user._id.toHexString())
        const AuthToken = {
            kind: USER_TOKEN_KIND.session,
            accessToken: token
        }
        user.tokens.push(AuthToken)

        // Save User
        const savedUser = await user.save();
        return {
            authToken: AuthToken,
            user: savedUser.toJSON()
        }
    }

    /**
     * Update User
     * @param where condition to update
     * @param userPayload : User input payload
     */
    async update(userPayload:any){
        // convert id to ObjectID
        userPayload.id = convertToObjectId(userPayload.id)

        // Validate user by specified User Id
        const isEmailAlreadyExistsExceptId = await UserValidation.emailAlreadyExistsExceptId(userPayload.id, userPayload.email)
        if(isEmailAlreadyExistsExceptId){
            throw new Error("User with same email address already exists!")
        }

        // Find user
        const where = {
            _id: userPayload.id
        }
        let user = await this._loader.userById(userPayload.id)
        if(!user){
            throw new Error("User not found!")
        }

        // Update user
        userPayload = lodash.merge(user, userPayload)
        const result = await User.updateOne(where, userPayload)

        if(result && result.ok){
            return userPayload
        }
        else{
            throw Error("Failed to update user, Please try again!")
        }
    }

    /**
     * Delete user by id
     * @param userPayload user payload with id
     */
    async delete(userPayload:any){
        // Find user
        const where = {
            _id: userPayload.id
        }
        let user = await this._loader.userById(userPayload.id)
        if(!user){
            throw new Error("User not found!")
        }

        // Delete user
        await User.deleteOne(where)
        return user
    }

    /**
     * Find one record
     * @param _id ID of user
     */
    async findOne(_id: string){
        return await this._loader.userById(_id)
    }

    /**
     * Get logged in user
     * @todo get by login user id
     */
    async me(_id: string){
        return await this._loader.userById(_id)
    }

    async oauthGoogle(profile){
        try{
            const googleUser = await User.findOne({ google_id: profile.id });
            if(googleUser){
                sendMail(profile.emails[0].value, profile.displayName, `Welcome back ${profile.displayName} - Zujo`, 'login');
                return await this.generateAndSaveToken(googleUser);
                }
            else{
                let user = new User({
                    google_id: profile.id,
                    email: profile.emails[0].value,
                    profile: {
                        name: profile.displayName,
                        picture: profile._json.picture
                    }
                });
                sendMail(profile.emails[0].value, profile.displayName, `Warm Welcome ${profile.displayName} - Zujo`, 'signup');
                return await this.generateAndSaveToken(user);
            }
        }
        catch(err){
            throw new Error(err)
        }
    }

    async oauthFacebook(profile){
        try{
            const fbUser = await User.findOne({ facebook_id: profile.id})
            if(fbUser) return await this.generateAndSaveToken(fbUser)
            
            else{
                let user = new User({
                    facebook_id: profile.id,
                    email: profile.emails[0].value,
                    profile: {
                        name: profile.displayName
                }
            });
            return await this.generateAndSaveToken(user)
            }
        }
        catch(err){
            throw new Error(err)
        }
    }

    private async generateAndSaveToken(user){
        const token = await JWT.generateToken(user._id.toHexString())
        const AuthToken = {
            kind: USER_TOKEN_KIND.session,
            accessToken: token
        }
        user.tokens.push(AuthToken)
        const savedUser = await user.save();
        return  {
            authToken: AuthToken,
            user: savedUser.toJSON()
        }
    }
}

export { UserRepository }