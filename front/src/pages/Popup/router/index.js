import React from "react";
import { useRecoilValue } from "recoil";
import CreateWallet from "../pages/CreateWallet/CreateWallet";
import Home from "../pages/Home/Home";
import { pageState } from "../recoil";

export const render = () => {
    const page = useRecoilValue(pageState);
    
    switch (page) {
        case 'Home': return <Home /> 
        case 'CreateWallet': return <CreateWallet /> 
        default: return <div>no page</div>
    }
}