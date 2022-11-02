import sha3 from 'js-sha3';
import { fromB64, toB64 } from './b64';
import {
  bytesEqual,
  SIGNATURE_SCHEME_TO_FLAG,
} from './publickey';

const PUBLIC_KEY_SIZE = 32;

export class Ed25519PublicKey {
    static data; // Uint8Array

    // PublicKeyInitData
    constructor(value) {
        if (typeof value === 'string') {
            this.data = fromB64(value);
        } else if (value instanceof Uint8Array) {
            this.data = value;
        } else {
            this.data = Uint8Array.from(value);
        }
    
        if (this.data.length !== PUBLIC_KEY_SIZE) {
            throw new Error(
                `Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
            );
        }
    }

    equals(publicKey) {
        return bytesEqual(this.toBytes(), publicKey.toBytes());
    }
    
    toBase64() {
        return toB64(this.toBytes());
    }

    toBytes() {
        return this.data;
    }
    
    toString() {
        return this.toBase64();
    }

    toSuiAddress() {
        let tmp = new Uint8Array(PUBLIC_KEY_SIZE + 1);
        tmp.set([SIGNATURE_SCHEME_TO_FLAG['ED25519']]);
        tmp.set(this.toBytes(), 1);
        return sha3.sha3_256(tmp).slice(0, 40);
    }
}