/**
 * Convert to base64
 * @param str simple string
 */
const toBase64 = (str: string) => {
    return new Buffer(str.toString()).toString('base64')
 }
 
 /**
  * Convert from base64 to string
  * @param str Simple string
  */
 const fromBase64 = (str: string) => {
     return Buffer.from(str, 'base64')
 }

 export { toBase64, fromBase64 }