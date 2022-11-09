import React from 'react';
import './MyWallet.css';
import {useRecoilValue} from "recoil";
import {pairState} from "../../recoil/index";
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { SDK } from '../../modules/sdk';

const MyWallet = () => {
    const pair = useRecoilValue(pairState);

    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('pending');

    useEffect(() => {
        const addressOfPub = SDK.getAddress(pair.getPublicKey());
        setAddress(addressOfPub);
        getBalance(addressOfPub);
        const interval = setInterval(async () => {
            setBalance(await SDK.getBalance(addressOfPub));
        }, 5000)

        return () => {
            clearInterval(interval);
        };
    }, [])

    const getBalance = async (addr) => {
        setBalance(await SDK.getBalance(addr));
    }

    const faucet = async () => {
        await SDK.getRequestTestToken(pair.getPublicKey());
    }

    return (
        <div className="MyWallet">
            <Header />

            <div className='wallet-info-box'>
                <div className='address'>{address}</div>
                <div className='balance'>{balance === 'pending' ? '...' : balance}  SUI</div>
            </div>

            <div>
                <button className='wallet-btn-faucet' onClick={faucet}>Faucet</button>
            </div>

            <Footer />
        </div>
    );
};

export default MyWallet;
