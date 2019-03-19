import lodash from 'lodash'
import { ConnectionCursor } from 'graphql-relay'

import { fromBase64 } from './common.encoding'
import { QueryDocumentKeys } from 'graphql/language/visitor';


/**
 * Convert ObjectId into cursor
 * @param objectId ObjectId of record
 */
const objectIdToCursor = (objectId: string): ConnectionCursor => {
    return new Buffer(objectId.toString()).toString('base64')
}

/**
 * 
 * @param query Query to execute
 * @param cursor current cursor as per previous and next
 * @param args pagination argument(s) {before, after, first, last}
 */
const hasPage = async (query: any, type: string, cursor: string, args: any) =>{
    const {before, after, first, last} = args;
    let where = {}
    if(type == 'previous'){
        where["_id"] = { $lt: cursor }
    }
    else if(type == "next"){
        where["_id"] = { $gt: cursor }
    }

    // Overwrite by before after
    if(before){
        where["_id"] = { $lt: fromBase64(before) }
    }
    if(after){
        where["_id"] = { $gt: fromBase64(after) }
    }
    console.log("where", where)
    const count = await query.count(where);
    console.log("count", count)

    let pageCount = count
    if(first){
        pageCount = count - first
    }
    if(last){
        pageCount = count - last
    }
    return pageCount > 0
}

/**
 * Return connection of mongoose model
 * @param query Mongoose model
 * @param cursor current cursor
 * @param edges List of edges
 */
const mongooseConnectionFromArray = async (query, edges: Array<Object>, args: any) => {
    const {before, after, first, last} = args;
    const firstEdge = lodash.first(edges);
    const lastEdge = lodash.last(edges);
    const hasPreviousPage =  await hasPage(query, 'previous', firstEdge && firstEdge["_id"], args);
    const hasNextPage = await hasPage(query, 'next', lastEdge && lastEdge["_id"], args);
    const cursorEdges = edges.map(
        (value, index) => {
          return {cursor: objectIdToCursor(value["_id"]), node: value};
        }
    );
    return {
        edges: cursorEdges,
        pageInfo:{
            startCursor: firstEdge && firstEdge["_id"] ? objectIdToCursor(firstEdge["_id"]) : null,
            endCursor: lastEdge && lastEdge["_id"] ? objectIdToCursor(lastEdge["_id"]) : null,
            hasPreviousPage: hasPreviousPage,
            hasNextPage: hasNextPage
        }
    }
}

export { 
    mongooseConnectionFromArray, 
    objectIdToCursor
}