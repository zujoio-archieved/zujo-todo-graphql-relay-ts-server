import { JWT } from "./common.jwt"
import { InvalidToken } from './common.exceptions'
import { processRequest } from "graphql-upload";

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
 const graphqlUploadExpress = options => (request, response, next) => {
  if (!request.is('multipart/form-data')) return next()

  const finished = new Promise(resolve => request.on('end', resolve))

  const { send } = response
  response.send = (...args) => {
    finished.then(() => {
      response.send = send
      response.send(...args)
    })
  }

  processRequest(request, response, options)
    .then(body => {
      request.body = body
      next()
    })
    .catch(error => {
      if (error.status && error.expose) response.status(error.status)
      next(error)
    })
}
export { authentication,graphqlUploadExpress }
