import React, { Component } from 'react';
import { ConnectedRouter } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import { history } from "../store/store.js";
import { connect } from "react-redux";
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';
import Navigation from './Navigation';
import Account from '../containers/Account';
import AddOffert from '../containers/AddOffert';
import Offerts from '../containers/Offerts';


const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const SignInUpRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};



const App = ({ authenticated }) =>{
    return (
      <ConnectedRouter history={history}>
        <div>
          <Navigation authenticate={authenticated} />
          <Route exact path='/' component={Home} />
          <Route path='/offerts' component={Offerts} />
          <PrivateRoute
            authenticated={authenticated}
            exact
            path="/add-offert"
            component={AddOffert}
          />
          <SignInUpRoute
            authenticated={authenticated}
            path="/signin"
            component={SignIn}
          />
          <SignInUpRoute
            authenticated={authenticated}
            path="/signup"
            component={SignUp}
          />
        </div>
      </ConnectedRouter>
    )
}


const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
 
export default connect(mapStateToProps)(App)
