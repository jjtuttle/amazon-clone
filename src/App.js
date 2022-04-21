import Header from './Header'
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StatProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const promise = loadStripe("pk_test_51KqfqZAc6MqE7bTK4BV0Yx28YVEb1uoNsMNfacGsN6V8aZ9povtKVZplLghG9mrwmdVGgNSikJ5ATivOMx8y3M7z00easM7MZf");

function App() {
  const [ { }, dispatch ] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      // console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // user just logged in / already logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // User is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [ dispatch ])

  return (
    <Router>
      <div className="app">

        <Switch>

          <Route exact path="/login">
            <Login />
          </Route>


          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route exact path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
