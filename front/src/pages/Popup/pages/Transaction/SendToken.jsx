import React, {useEffect, useState} from 'react';

const SendToken = () => {

    const [amount, setAmount] = useState();
    const [toAddress, setAddress] = useState();


    console.log("after input amount : "+amount);
    console.log("after input toAddress : "+toAddress);


    /*
    * 화면에서 상대방 공개키 + 보내는 sui 받아서 송금 실행 
    */
    const send = () => {
        console.log("start send sui coin: ");
        console.log("=====================");
        console.log("===== To : ==========" + toAddress);
        console.log("===== Amount : ======" + amount);
        console.log("=====================");



    }

return (
    <div className="Home">
        SendToken  
        <input onChange={(e) => setAmount(e.target.value)} name="amount" placeholder="sui"></input>
        <input onChange={(e) => setAddress(e.target.value)}name="toAddress" placeholder="To"></input>      
        <button onClikc={send()} type="submit">전송</button>
    </div>

    );

}

export default SendToken;