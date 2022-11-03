import React from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SDK } from '../../modules/sdk';
import { pageState } from '../../recoil';
import './Home.css';

const Home = () => {
    const setPageState = useSetRecoilState(pageState);

    useEffect(() => {
        SDK.generateMnemonic();
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
