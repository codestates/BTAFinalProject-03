import React from 'react';
import './History.css';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {pageState, pairState} from "../../recoil/index";
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import { useEffect } from 'react';
import { SDK } from '../../modules/sdk';


const History = () => {
    const setPageState = useSetRecoilState(pageState);
    const pair = useRecoilValue(pairState);

    useEffect(async () => {
        const history = await SDK.getHistoryTranssaction(SDK.getAddress(pair.getPublicKey()));
        console.log(history);
    }, [])

    return (
        <div className="History">
            <Header />

            <div>

            </div>

            <Footer />
        </div>
    );
};

export default History;
