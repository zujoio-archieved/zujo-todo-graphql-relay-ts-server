import * as bcrypt from "bcrypt";

class Encryption {

    /**
     * Generate hash of payload
     * @param payload
     * @returns Hash of payload
     */
    public static async encrypt(payload: string){
        return bcrypt.hashSync(payload, 10);
    }

    /**
     * Compare plain string with Hash
     * @param plain plain string needs to compare with hashsed
     * @param hashed hashed string version of plain string
     * @returns Returns boolean defines True or False comparision
     */
    public static async compareHash(plain: string, hashed: string){
        return bcrypt.compareSync(plain, hashed);
    }

}

export { Encryption } 