import Header from './Header'
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StatProvider';
import Payment from './Payment';


function App() {
  const [ { }, dispatch ] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>", authUser);

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
            <Payment />
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
