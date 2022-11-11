import React, {useEffect, useState} from 'react';
import './SendToken.css';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {pageState, pairState} from "../../recoil/index";
import { SDK } from '../../modules/sdk';

const SendToken = () => {
    
    const setPageState = useSetRecoilState(pageState);
    const pair = useRecoilValue(pairState);

    const [amount, setAmount] = useState();
    const [toAddress, setAddress] = useState();
    const [disabled, setDisabled] = useState();
    const [pubkey, setPubkey] = useState();
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState();

    useEffect(async() => {
        setDisabled(true);
        setPubkey(SDK.getAddress(pair.getPublicKey()));
        setBalance(await SDK.getBalance(pubkey));

        console.log("toAddress : " + toAddress);
        if(typeof toAddress != "undefined" && toAddress != null){
            checkSuiAddressVerify(toAddress);
        }

    }, [toAddress]);

    /*
    * 화면에서 상대방 공개키 + 보내는 sui 받아서 송금 실행 
    */
    const send = () => {
        console.log("start send sui coin: ");
        console.log("=====================");
        console.log("===== To : ==========" + toAddress);
        console.log("===== Amount : ======" + amount);
        console.log("=====================");
        //공개키 메인에서 페이지 전환 시 전달 받을 것, 
        SDK.sendToken(pair, pubkey, toAddress, amount)
        .then((result) =>{
            console.log(`send result is ${result}`);
            setMessage("송금이 완료되었습니다.");

        })
        .catch((error) => {

        });
    }

    /*
    * 상대방의 주소가 입력되면 계좌 검증을 통해, 검증 결과가 true인 경우 송금 버튼을 활성화
    */
    const checkSuiAddressVerify = (toAddress) => {
        console.log("start checkSuiAddressVerify");
        console.log("toAddress : " + toAddress);
        console.log("toAddress : " + typeof toAddress);
        console.log("toAddress : " + toAddress.length);
        //입력받은 pubkey 검증
        if(toAddress != null && toAddress.length === 42){
            console.log("계좌 검증 완료"+SDK.isSuiAddress(toAddress));
            setDisabled(false);
        }
    }


return (
    <div className="Send">

        <div className="Send-title">SendToken</div> 

            <div className='Send-Address-input-box'>
                <p className='Send-Address-input-subtitle'>Enter or search the address of the recepient below to start sending coins.</p>
                    <input className='Send-Address-input' onChange={(e) => setAddress(e.target.value)} name="toaddress" placeholder="Address"></input>
            </div>
            <div className='Send-Amuount-input-box'>
                <p className='Send-Amuount-input-subtitle'>Amount</p>
              
                    <input className='Send-Amuount-input' onChange={(e) => setAmount(e.target.value)}name="amount" placeholder="Amount"></input>       
            
            </div>

            <div className="balance-check">
                Available is <div className='balance'>{balance === 0 ? '...' : '0.'+balance}  Sui</div>
            </div>

            
            <button className={`submit-button-${disabled}`} onClick={send} type="submit">Transfer Sui</button>
            <div className="sent-message">{message}</div>
    </div>

    );

}

export default SendToken;