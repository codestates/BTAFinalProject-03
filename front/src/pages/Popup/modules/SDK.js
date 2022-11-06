import * as bip39 from '@scure/bip39';
import { wordlist } from "@scure/bip39/wordlists/english";
import { JsonRpcProvider, Ed25519Keypair, Ed25519PublicKey, RawSigner, PublicKey, Coin } from '@mysten/sui.js';

const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io');

export class SDK {
    static generateMnemonic() {
        const mnemonics = bip39.generateMnemonic(wordlist);
        this.getPair(mnemonics);
        return mnemonics;
    }

    static async getPair(mnemonics) {
        const seed64Bytes = await bip39.mnemonicToSeed(mnemonics);
        const seed32Bytes = seed64Bytes.slice(0, 32);
        const keypair = Ed25519Keypair.fromSeed(seed32Bytes).keypair;
        console.log(keypair)
        this.getAddress(keypair.publicKey);
        return keypair;
    }

    static getAddress(publicKey) {
        const address = new Ed25519PublicKey(publicKey).toSuiAddress();
        console.log(address);
        this.getBalance();
        this.getObject();
        return "0x" + address;
    }

    static async sendToken(keypair) {
        const signer = new RawSigner(keypair, provider);

        const txn = {
            //코인 객체 id
            suiObjectId: "0x33ef108d19289702a352a86b6f948d5e4b437500",
            gasBudget: 1000,
            //받는 사람 주소
            recipient: "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5",
            amount: 5000000
        }

        const result = await signer.transferSuiWithRequestType(txn);

        return result;
    }

    static async getBalance() {
        const objects = await provider.getObjectsOwnedByAddress('0x6f03a907c902323c09040eaadb2d71d24dc8f1fb');

        let balance = 0;
        for(let i = 0; i < objects.length; i++){
            const object = await this.getObject(objects[i].objectId);
            if(object.details.data.fields.balance !== undefined){
                balance += object.details.data.fields.balance;
            }
        }

        return balance;
    }

    static async getObject(objectId) {
        const result = await provider.getObject(objectId);
        return result;
    }
}