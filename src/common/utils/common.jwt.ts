import * as jwt from "jsonwebtoken";

class JWT{
    /**
     * Generate token
     * @param payload payload for generating token
     */
    public static async generateToken(payload: string){
        return `JWT ${jwt.sign(
            { payload },
            process.env.SESSION_SECRET,
            { expiresIn: 60 * 60 * 60 }
        )}`;
    }

    /**
     * extract token from Authorization header
     * @param token JWT token
     */
    public static async extractToken(token: string){
        return token.split(' ').pop()
    }

    /**
     * Verify JWT token 
     * @param token jwt token
     */
    public static async verifyToken(token: string){
        return jwt.verify(token, process.env.SESSION_SECRET)
    }

    /**
     * Extract user id from Express req using token verification
     * @param req Express request
     */
    public static async extractUserIdfromReq(req){
        if(req){
            const headers = req && req.headers
            console.log("const headers", headers)
            if(headers && headers['authorization']){
                try{
                    const authorization = headers['authorization'];
                    const extractedToken = await this.extractToken(authorization)
                    const jwtPayload = await this.verifyToken(extractedToken)
                    return jwtPayload && jwtPayload.payload
                }
                catch(error){
                    throw error
                }
            }
        }
        else{
            return null
        }
    }
}

export { JWT }