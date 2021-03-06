import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { auth } from './firebase';
// import { useStateValue } from './StatProvider';



const Login = () => {
    // const [ { basket }, dispatch ] = useStateValue();
    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleDemo = (e) => {
        e.preventDefault();
    
        const email = "demo@demo.dev";
        const password = "password";

        auth.signInWithEmailAndPassword(email, password)
            .then( auth => {
                history.push('/');
            })
    };


    const signIn = (e) => {
        e.preventDefault();

        // Firebase login
        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/');
        })
        .catch(error => alert(error.message));
    }

    const register = (e) => {
        e.preventDefault();

        // Firebase register
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // console.log("Auth made????????", auth);
                if(auth) {
                    history.push('/');
                }
            })
            .catch(error => alert(error.message));
    }

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
                    <input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="login__signInButton"
                        type='submit'
                        onClick={signIn}
                    >
                        Sign In
                    </button>

                    <div className="login__demoUser">
                        <button className='login__demoUserBtn'
                            onClick={handleDemo}>
                            Demo User Login
                        </button>
                    </div>

                </form>
                <p>
                    By signing-in you agree to <strong>**AMAZON FAKE CLONE** </strong>
                    Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice
                    and our Interest-Based Ads Notice.
                </p>
                <button className="login__registerButton"
                    onClick={register}
                >
                    Create your Amazon Account
                </button>
            </div>
        </div>
    );
};

export default Login;