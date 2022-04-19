import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';


const Login = () => {
    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                    alt="logo"
                />
            </Link>

            <div className="login__container">
                <h1>sign-in</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" /> 

                    <h5>Password</h5>
                    <input type="password" />

                    <button>Sign In</button>
                </form>
                <p>
                    By signing-in you agree to Amazon's
                    Conditions of Use & Sale. Please 
                    see our Privacy Notice, our Cookies Notice 
                    and our Interest-Based Ads Notice.
                </p>
            </div>
        </div>
    );
};

export default Login;