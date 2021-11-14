import React, { useState } from 'react';
import '../../style/Register.css';
import Login from './Login';
import SignUp from './SignUp';

function Register (props) {
    const [change, setChange] = useState(0);

    const Login_signup_chnager = () => {
        if (change) {
            return (
                <SignUp hospital = {props.hospital} account = {props.account}/>
            );
        } else {
            return (
                <Login/>
            );
        }
    };
    return (
        <div className = "register_page">
            <div className = "register_page_top">
                <button id = "Login" className = "active" onClick = {() => {
                    if (!document.getElementById('Login').classList.contains('active')) {
                        document.getElementById('Login').classList.add('active');
                        document.getElementById('Sign-up').classList.remove('active');
                        setChange(0);
                    }
                }}>Login
                </button>
                <button id = "Sign-up" onClick = {() => {
                    if (!document.getElementById('Sign-up').classList.contains('active')) {
                        document.getElementById('Sign-up').classList.add('active');
                        document.getElementById('Login').classList.remove('active');
                        setChange(1);
                    }
                }}>Sign-up
                </button>
            </div>
            <div className = "register_page_middle">
                {
                    Login_signup_chnager()
                }
            </div>
        </div>
    );
}

export default Register;
