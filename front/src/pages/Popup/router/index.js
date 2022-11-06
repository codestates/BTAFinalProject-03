import React from "react";
import { useRecoilValue } from "recoil";
import CreateWallet from "../pages/CreateWallet/CreateWallet";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import SendToken from "../pages/Transaction/SendToken";
import { pageState } from "../recoil";

export const render = () => {
    const page = useRecoilValue(pageState);
    
    switch (page) {
        case 'Home': return <Home /> 
        case 'CreateWallet': return <CreateWallet />
        case 'Login': return <Login />
        case 'Register': return <Register /> 
        case 'SendToken': return <SendToken /> 
        default: return <div>no page</div>
    }
}