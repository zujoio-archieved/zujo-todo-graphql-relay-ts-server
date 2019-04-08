"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_jwt_1 = require("./common.jwt");
const common_exceptions_1 = require("./common.exceptions");
const graphql_upload_1 = require("graphql-upload");
const authentication = (resolve, root, args, context, info) => __awaiter(this, void 0, void 0, function* () {
    const token = (context
        && context.req
        && context.req.headers
        && context.req.headers.authorization);
    const path = JSON.stringify(info.path);
    const matchingRoutes = path.match(/login|register/g);
    if (matchingRoutes && matchingRoutes.length == 0) {
        if (token) {
            try {
                const extractedToken = yield common_jwt_1.JWT.extractToken(token);
                const jwtPayload = yield common_jwt_1.JWT.verifyToken(extractedToken);
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new common_exceptions_1.InvalidToken();
        }
    }
    const result = yield resolve(root, args, context, info);
    return result;
});
exports.authentication = authentication;
const graphqlUploadExpress = options => (request, response, next) => {
    if (!request.is('multipart/form-data'))
        return next();
    const finished = new Promise(resolve => request.on('end', resolve));
    const { send } = response;
    response.send = (...args) => {
        finished.then(() => {
            response.send = send;
            response.send(...args);
        });
    };
    graphql_upload_1.processRequest(request, response, options)
        .then(body => {
        request.body = body;
        next();
    })
        .catch(error => {
        if (error.status && error.expose)
            response.status(error.status);
        next(error);
    });
};
exports.graphqlUploadExpress = graphqlUploadExpress;
//# sourceMappingURL=common.middlewares.js.map