import React from 'react';
import { useSetRecoilState } from 'recoil';
import { pageState } from '../../recoil';
import './Home.css';

const Home = () => {
    const setPageState = useSetRecoilState(pageState);

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
