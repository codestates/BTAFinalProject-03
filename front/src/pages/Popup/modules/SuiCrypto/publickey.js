export function bytesEqual(a, b) {
    if (a === b) return true;
  
    if (a.length !== b.length) {
        return false;
    }
  
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
  

export const SIGNATURE_SCHEME_TO_FLAG = {
    ED25519: 0x00,
    Secp256k1: 0x01,
};