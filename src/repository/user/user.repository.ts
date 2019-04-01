import lodash from "lodash"

import { UserValidation } from "./user.validation"
import { Encryption } from "../../common/utils/common.encryption"
import { JWT } from "../../common/utils/common.jwt"
import { User } from "../../schemas/user"
import { USER_TOKEN_KIND } from "../../common/utils/common.constant"
import { convertToObjectId } from "../../schemas/utils"
import { EmailAlreadyExists } from '../../common/utils/common.exceptions'
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
        const isEmailAlreadyExistsExceptId =await UserValidation.emailAlreadyExistsExceptId(userPayload.id, userPayload.email)
        if(isEmailAlreadyExistsExceptId){
            throw new Error("User with same email address already exists!")
        }

        // Find user
        const where = {
            _id: userPayload.id
        }
        let user = await User.findOne(where)
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
        let user = await User.findOne(where)
        if(!user){
            throw new Error("User not found!")
        }

        // Delete user
        await User.deleteOne(where)
        return user
    }

    /**
     * Find one record
     * @param id ID of user
     */
    async findOne(id: String){
        // Find user
        const where = {
            _id:id
        }
        let user = await User.findOne(where)
        if(!user){
            throw new Error("User not found!")
        }
        return user
    }

    /**
     * Get logged in user
     * @todo get by login user id
     */
    async me(_id: string){
        return await this._loader.userById(_id)
        /*
        let user = await User.findOne({ _id: _id })
        if(!user){
            throw new Error("User not found!")
        }
        return user
        */
    }
}

export { UserRepository }