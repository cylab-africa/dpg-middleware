import { ALGORITHM, IV, KEY } from "./encrypt.env";

const crypto = require("crypto");

export function cipheringText(text)
{    
    // console.log(crypto.randomBytes(32).toString('hex')); // generate 32 bytes random string
    let cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);  
    let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}


export function decipheringText(encrypted)
{    
    let decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}
