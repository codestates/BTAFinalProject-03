import React from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ED25519KeyPair } from '../../modules/SuiCrypto/ed25519-keypair';
import { Ed25519PublicKey } from '../../modules/SuiCrypto/ed25519-publickey';
import { pageState } from '../../recoil';
import './Home.css';

const Home = () => {
    const setPageState = useSetRecoilState(pageState);

    useEffect(() => {
        const { publicKey } = ED25519KeyPair.generate();

        const address = new Ed25519PublicKey(publicKey).toSuiAddress();
        console.log(address);
    }, [])

    return (
        <div className="Home">
            Home

            <button onClick={() => {
                setPageState('CreateWallet');
            }}>CreateWallet</button>
        </div>
    );
};

export default Home;
