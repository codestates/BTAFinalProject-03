import React, {useEffect, useState} from 'react';
import { useSetRecoilState } from 'recoil';
import { SDK } from '../../modules/sdk';
import { pageState } from '../../recoil';
import './Home.css';

const Home = () => {
    const setPageState = useSetRecoilState(pageState);


    useEffect(() => {
        SDK.generateMnemonic();
    }, [])

    const [pubkey, setpubkey] = useState();
    const [balance, setBalance] = useState();

    /*
    * 공개키 주소, 잔액 불러오는 함수 자리 
    */
    const address = "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5";
    const suiCoin = "0";

    useEffect(() => {
        setpubkey(address);
        setBalance(suiCoin);
    }, []);

    /*
    * onClick
    */
   const onClick = (param) => {
        console.log("Click Event");
        if(param === "requestTestToken"){
            getTestToken();
        }else if(param === "sendToken"){
            setPageState('SendToken');
        }
   }


    /*
    * 수이 테스트토큰 받기 
    */
    const getTestToken = () => {
        
        console.log("STRAT GET TEST TOKEN");
        //useState에 저장되어있는 공개키 주소
        const userAddress = pubkey;

        //getTestToken URL 호출 
    }


    return (
        <div className="Home">
            Home
            <button onClick={() => {
                setPageState('CreateWallet');
            }}>CreateWallet</button>
            <div>
                {pubkey}
            </div>
            <div>
                {balance} Sui
            </div>
            <button onClick={() => onClick("requestTestToken")}>Request Sui Test Coin</button>
            <button onClick={() => onClick("sendToken")}>Send Sui Coin</button>
            
        </div>
    );
};

export default Home;
