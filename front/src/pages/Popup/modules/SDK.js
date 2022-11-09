import * as bip39 from '@scure/bip39';
import { wordlist } from "@scure/bip39/wordlists/english";
import { JsonRpcProvider, Ed25519Keypair, Ed25519PublicKey, RawSigner, PublicKey, Coin, Network } from '@mysten/sui.js';

const provider = new JsonRpcProvider(Network.DEVNET);

export class SDK {
    static generateMnemonic() {
        const mnemonics = bip39.generateMnemonic(wordlist);
        return mnemonics;
    }

    /*
    * 니모닉을 통한 공개키 발급
    */
    static async getPair(mnemonics) {
        const seed64Bytes = await bip39.mnemonicToSeed(mnemonics);
        // const seed32Bytes = seed64Bytes.slice(0, 32);
        const keypair = Ed25519Keypair.fromSeed(seed64Bytes.slice(0,32));
        return keypair;
    }

    /*
    * 공개키 노출 
    */
    static getAddress(publicKey) {
        const address = new Ed25519PublicKey(publicKey).toSuiAddress();
        return "0x" + address;
    }

    /*
    * 송금
    */
    static async sendToken(_keypair, _pubkey, _toAddress, _amount) {

        /*
        const mnemonics = "gentle embrace hard glance lake method draft fossil stick settle pear glove";
        const seed = await bip39.mnemonicToSeed(mnemonics);
        console.log("convert to seed : " + seed);
        console.log("convert to seed : " + typeof seed);

        const keypairTeset = Ed25519Keypair.fromSeed(seed.slice(0,32));
        console.log("test : " + keypairTeset);
        */

        //송금 signer 생성
        const signer = new RawSigner(_keypair, provider);
        console.log("convert to signer : " + signer);


        //공개키가 보유한 sui object 조회
        const map = await this.getOwnSuiList(_pubkey);
        console.log("Own Sui List : "+ map);
        const _suiOnjectId = map.keys().next().value;
        console.log("_suiOnjectId : "+ _suiOnjectId);

        const sendAmount = _amount * 10000000;

        const txn = {
            //코인 객체 id
            suiObjectId: _suiOnjectId,
            gasBudget: 1000,
            //받는 사람 주소
            recipient: _toAddress,
            amount: sendAmount
        }

        const result = await signer.transferSuiWithRequestType(txn);
         
        console.log(`send sui complete : ${result}`);
        return result;    

    }

    static async getBalance(address) {
        const objects = await provider.getObjectsOwnedByAddress(address);

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

    /*
    * 보유하고 있는 수이 리스트 
    */
    static async getOwnSuiList(publicKey) {

        //테스트용 공개키 주소, 파라미터로 공개키 받을 것 
        const _pubkey = publicKey;
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
        }

        console.log("return map : "+map);
        return map;

        }


    /*
    * 거래 히스토리를 보여주는 방법 
    * 01. 보유하고 있는 수이 코인 객체를 불러옴. 
    * 02. 각 객체의 digest를 가져오고, 
    * 03. transaction data 에서 필요한 정보를 가져옴. 
    */
    static async getHistoryTranssaction(pub){

        //함수 테스트용, 실제 연결할때는 파라미터를 공개키로 받고 아래 코드 대체 예정 
        console.log("Staring get transaction history");
        // const pubkey = '0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5';
        const pubkey = pub;

        //공개키로 모든 digest 내역 가져오기
        const resultOfdiget = await provider.getTransactionsForAddress(pubkey);
        // console.log("resultOfdiget : "+resultOfdiget);
        console.log("resultOfdiget : "+resultOfdiget.length);

        // 이 데이터로 원하는 데이터 뽑아냄 {return : flag: sent or receiver, recipients : 받은 사람, amount : 받은 돋, gas: 수수료}
        // flag는 recipents의 주소가 입력한 공개키와 일치하면 받은 돈, 불일치하면 보낸 돈으로 판단 

        let _flag, _recipients, _amount, _gas;
        const map = new Map();

        for (let i=0; i<resultOfdiget.length; i++){
            //digest로 transaction 디테일 불러오기
            const history = await provider.getTransactionWithEffects(resultOfdiget[i]);
            console.log(`${i}번째 digest : ${resultOfdiget[i]}`);
    
            //불러온 내역 중에서 transactions만 빼오기
            const selector = history.certificate.data.transactions;
            // console.log("selector : " + JSON.stringify(selector));
    
    
            //PaySui가 여러개 토큰을 발행해주는 메소드로 판단되어 분기 처리 
            const methodName = JSON.stringify(selector).split("\"")[1];
            console.log("methodName : "+ methodName);
    
            //json data 대괄호를 없애기 위한 작업
            const a = JSON.stringify(selector[0]);
            // console.log("a : " + a);
    
            _gas = history.effects.events[0].coinBalanceChange.amount;
            // console.log("_gas : "+_gas);
    
            const data = JSON.parse(a);

            if(methodName == "PaySui"){
                // console.log("data.Paysui.amounts : "+ data.PaySui.amounts);
    
                //amount가 리스트로 내려오면 내려온 값 합산
                if(1<data.PaySui.amounts.length){
                    
                    const subtotal = data.PaySui.amounts.reduce((accumulator, current) => {
                        return accumulator + current;
                    }, 0)
                    
                    // console.log("subtotal : "+subtotal);
                    _amount = subtotal;
                }else{
                    _amount = data.PaySui.amounts;
                }
    
                // console.log("data.Paysui.recipients : "+data.PaySui.recipients);
    
                //recipients가 복수로 내려오는 경우 확인 (테스트 토큰 지급시 수령인 5개가 모두 동일 주소로 내려옴)
                if(1<data.PaySui.recipients.length){
                    _recipients = data.PaySui.recipients[0];
                }else{
                    _recipients = data.PaySui.recipients;
                }
    
                //수령인과 공개키를 비교하여 플래그 결정 
                if(pubkey == _recipients){
                    _flag = "Received"
                }else{
                    _flag = "Sent"
                }
    
            }else if (methodName == "Pay"){
                // console.log("data.Pay.amounts : "+data.Pay.amounts);
                _amount = data.Pay.amounts;
    
                // console.log("data.Pay.recipients : "+data.Pay.recipients);
                _recipients = data.Pay.recipients;
    
                //수령인과 공개키를 비교하여 플래그 결정 
                if(pubkey == _recipients){
                    _flag = "Received"
                }else{
                    _flag = "Sent"
                }
            }
            
            console.log(`_flag : ${_flag}, _recipients : ${_recipients}, _amount : ${_amount}, _gas : ${_gas}`);
            map.set(i, [_flag, _recipients, _amount, _gas]);

        }
        return map;

    }

    /*
    * 테스트 토큰 요청하기
    */
    static async getRequestTestToken(publicKey){
        const _pubkey = publicKey;

        const _provider = new JsonRpcProvider(Network.DEVNET, {
            // you can also skip providing this field if you don't plan to interact with the faucet
            faucetURL: 'https://faucet.devnet.sui.io',
        });

        const result = await _provider.requestSuiFromFaucet(_pubkey)
        console.log("response : " + result);
    }

    /*
    * 수이 계좌 검증
    */ 
    static async isSuiAddress(publicKey){

        const SUI_ADDRESS_LENGTH = 20;
    
        const checkReg1 = /^(0x|0X)?[a-fA-F0-9]+$/.test(publicKey) && publicKey.length % 2 === 0;
        const checkReg2 = /^(0x|0X)/.test(publicKey) ? (publicKey.length - 2) / 2 : publicKey.length / 2;
        const checkReg3 = SUI_ADDRESS_LENGTH

        console.log(`checkReg1 : ${checkReg1}, checkReg2 : ${checkReg2}, checkReg3 : ${checkReg3}`);
        console.log(checkReg1 && checkReg2 === checkReg3);
        return (checkReg1 && checkReg2 === checkReg3)

    }


    }
