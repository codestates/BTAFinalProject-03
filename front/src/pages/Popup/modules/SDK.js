import * as bip39 from '@scure/bip39';
import { wordlist } from "@scure/bip39/wordlists/english";
import { mnemonicToSeed, Ed25519Keypair, Ed25519PublicKey } from '../modules/untitled folder/dist/index.mjs';

export class SDK {
    static generateMnemonic() {
        const mnemonics = bip39.generateMnemonic(wordlist);

        return mnemonics;
    }

    static getPair(mnemonics) {
        const seed64Bytes = mnemonicToSeed(mnemonics);
        const seed32Bytes = seed64Bytes.slice(0, 32);
        const keypair = Ed25519Keypair.fromSeed(seed32Bytes).keypair;

        return keypair;
    }

    static getAddress(publicKey) {
        const address = new Ed25519PublicKey(publicKey).toSuiAddress();

        return "0x" + address;
    }

    static sendToken() {

    }
}