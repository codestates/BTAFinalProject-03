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

    static async getOwnSuiList() {

        //테스트용 공개키 주소, 파라미터로 공개키 받을 것 
        const _pubkey = '0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5';
        console.log("STRAT SEARCHING History OF transaction");

        //결과를 리턴하기 위한 map 정의 (key : 오브젝트id, value {타입, 잔액})
        const map = new Map();

        //공개키가 가지고 있는 Sui Ojbject 확인
        const resultOfObjects =  await provider.getObjectsOwnedByAddress(_pubkey);
        //가지고 있는 수이 코인 오브젝트 갯수 
        const sizeOfobject = resultOfObjects.length;
        console.log("sizeOfobject : " + sizeOfobject);

        //map에 오브젝트id와 type을 먼저 셋팅 
        for (var i = 0; i < sizeOfobject; i++) {
            map.set(resultOfObjects[i].objectId, [resultOfObjects[i].type]); //key : objectId, value : sui type
        }

        //밸런스를 가져오기 위한 작업
        const sizeOfmap = map.size;
        let objectBalance;
        for(let i=0; i<sizeOfmap; i++){

            const object = await provider.getObject(resultOfObjects[i].objectId);
            //잔액을 조회 
            const toJsonResutl = JSON.stringify(object.details);
            objectBalance =  toJsonResutl.split(",")[3].split(":")[2];
            console.log("objectBalance : "+objectBalance);

            //typescript에서 map은 set으로 값을 새로 지정해줌. 최근 값만 업데이트가 되기 때문에 기존 밸류값을 템프에 넣어두고 다시 셋에 사용함. 
            const tempValue = map.get(resultOfObjects[i].objectId);
            map.set(resultOfObjects[i].objectId, [tempValue,objectBalance]);                

            //map 구조 셋팅 확인용 
            console.log("check values : " + map.get('0x4fbc250ac48976a36898777fe94f2f5540f99e22'));
        }

        console.log("return map : "+map);
        return map;

        }




    }
