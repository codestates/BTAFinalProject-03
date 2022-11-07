import React from 'react';
import './MyWallet.css';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {pageState, pairState} from "../../recoil/index";
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { SDK } from '../../modules/sdk';
import Storage from '../../modules/Storage';

const MyWallet = () => {
    const setPageState = useSetRecoilState(pageState);
    const pair = useRecoilValue(pairState);

    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(async () => {
        setAddress(SDK.getAddress(pair.publicKey));
        setBalance(await SDK.getBalance(address));
    }, [])

    const deleteWallet = async () => {
        await Storage.clear();
        setPageState('Home');
    }

    return (
        <div className="MyWallet">
            <Header />

            <div className='wallet-info-box'>
                <div className='address'>{address}</div>
                <div className='balance'>{balance === 0 ? '...' : balance}  SUI</div>
            </div>

            <div>
                <button onClick={deleteWallet}>DeleteWallet</button>
                <button>Send</button>
            </div>

            <Footer />
        </div>
    );
};

export default MyWallet;
