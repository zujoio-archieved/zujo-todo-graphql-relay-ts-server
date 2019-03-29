import { fromBase64 } from './common.encoding'

/**
 * Get condition for pagination
 * @param where Conditional where
 * @param args pagination arguments { before, after, first, last }
 */
const getPaginatedRecords = async (query: any, where: any, args: any) =>{
    const {before, after, first, last} = args;

    if(before){
        const _id = fromBase64(before)
        where["_id"] = { $lt: _id }
    }
    if(after){
        const _id = fromBase64(after)
        where["_id"] = { $gt: _id }
    }

    let orderBy = { _id: 1 }
    let limit = first
    if(last){
        limit = last
        orderBy["_id"] = -1
    }


    const edges = await query.find(where)
                            .limit(limit)
                            .sort(orderBy)
    return edges
}

export { getPaginatedRecords }