import { JWT } from "./common.jwt"
import { InvalidToken } from './common.exceptions'

const authentication = async (resolve, root, args, context, info) => {
    const token = (context 
        && context.req 
        && context.req.headers 
        && context.req.headers.authorization);
    const path = JSON.stringify(info.path)
    const matchingRoutes = path.match(/login|register/g)
    if(matchingRoutes && matchingRoutes.length == 0){
      if(token){
          try{
            const extractedToken = await JWT.extractToken(token)
            const jwtPayload = await JWT.verifyToken(extractedToken)
          }
          catch(error){
            throw error
          }
      }
      else{
        throw new InvalidToken()
      }
    }
    const result = await resolve(root, args, context, info)
    return result
}

export { authentication }