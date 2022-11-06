import React from 'react';
import { useSetRecoilState } from 'recoil';
import { pageState } from '../../recoil';

const Login = () => {
    const setPageState = useSetRecoilState(pageState);
    
    // click event 
    const onClick = (param) => {
        console.log("call verify function");
        
        if(param === "verify"){
            //비밀번호와 keypair 검증 함수 호출
            if(verifyPassword()){
                setPageState('Home');
            };
        }else if(param === "register"){
            setPageState('Register');
        };
        

    }

    // 비밀번호 검증 함수
    const verifyPassword = () => {
        console.log("starting verify password with keypair");
        //검증이 정상적으로 완료되면 true 리턴
        return true;
        // false 면 메세지 리턴 
        console.log("incorrect your password");
    }

    return (
        <div className="Home">
            Login

            <button onClick={() => {
                onClick("verify");
            }}>Login</button>
             <button onClick={() => {
                onClick("register");
            }}>Register</button>
        </div>
    );
};

export default Login;
