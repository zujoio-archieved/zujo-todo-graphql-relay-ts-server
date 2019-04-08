/**
 * Interface for Repository
 */
export interface IRepository{
    /**
     * Find all records with filter and pagination
     * @param args 
     */
    //findAll(args:Object): Promise<Object[]>

    /**
     * Find single record with filter
     * @param args 
     */
    //find(args:Object):Promise<Object>

    /**
     * Create record
     * @param args 
     */
    create(args:any):Promise<any>

    /**
     * Update record
     * @param args 
     */
    update(args:Object):Promise<any>

    /**
     * Delete record
     * @param args 
     */
    delete(args:Object):Promise<Object>
}