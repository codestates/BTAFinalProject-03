import nacl from 'tweetnacl';
import { toB64 } from './b64';

export class ED25519KeyPair {
    static generate() {
        const { publicKey, secretKey } = nacl.sign.keyPair();  
        console.log({ publicKey, secretKey })

        console.log({ publicKey: toB64(publicKey), secretKey: toB64(secretKey) })
        return { publicKey, secretKey };
    }
}