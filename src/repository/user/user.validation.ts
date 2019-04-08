import { User } from "../../schemas/user/index"

class UserValidation{
    /**
     * Validate email address of user already exists or not
     * @param email Email address of user
     * @returns True | False 
     */
    public static async emailAlreadyExists(email: String){
        const where = {
            email: email
        }
        const user = await User.findOne(where)
        if(user)
            return true
        else
            return false
    }

    /**
     * Validate email address of user already exists or not except specified Id
     * @param email Email address of user
     * @returns True | False 
     */
    public static async emailAlreadyExistsExceptId(id: String, email:String){
        const where = {
            _id:{ "$ne": id },
            email: email
        }
        const user = await User.findOne(where)
        if(user)
            return true
        else
            return false
    }
}

export {
    UserValidation
}