import React from 'react';
import { useSetRecoilState } from 'recoil';
import { pageState } from '../../recoil';

const Register = () => {
    const setPageState = useSetRecoilState(pageState);

    // click event 
    const onClick = () => {
        console.log("call register function")
        setPageState('Home');
    }

    return (
        <div className="Home">
            Register

            <button onClick={() => {
                onClick();
            }}>Register</button>
        </div>
    );

}

export default Register;