import React, { Component } from 'react';
import { ConnectedRouter } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import { history } from "../store/store.js";
import { connect } from "react-redux";
import { SignIn, SignUp, Home } from '../containers/SignIn'



const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

const App = ({authenticated}) =>{
    return (
      <ConnectedRouter history={history}>
        <PublicRoute
          authenticated={authenticated}
          path="/signup"
          component={SignUp}
        />
        <PublicRoute
          authenticated={authenticated}
          exact
          path="/signin"
          component={SignIn}
        />
        <PrivateRoute
          authenticated={authenticated}
          path="/home"
          component={Home}
        />
      </ConnectedRouter>
    )
}

 
export default App
