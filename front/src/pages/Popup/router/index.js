import React from "react";
import { useRecoilValue } from "recoil";
import Home from "../pages/Home/Home";
import { pageState } from "../recoil";

export const render = () => {
    const page = useRecoilValue(pageState);
    
    switch (page) {
        case 'Home': return <Home /> 
        default: return <div>no page</div>
    }
}