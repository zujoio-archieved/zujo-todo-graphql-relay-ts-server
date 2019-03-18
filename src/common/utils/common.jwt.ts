import * as jwt from "jsonwebtoken";

class JWT{
    /**
     * Generate token
     * @param payload payload for generating token
     */
    public static async generateToken(payload: String){
        return `JWT ${jwt.sign(
            { payload },
            process.env.SESSION_SECRET,
            { expiresIn: 60 * 60 }
        )}`;
    }
}

export { JWT }