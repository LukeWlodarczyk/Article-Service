import React, { Component } from 'react';
import { ConnectedRouter } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import { history } from "../store/store.js";
import { connect } from "react-redux";



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

class App extends Component {
  render(){
    return (
      <ConnectedRouter history={history}>
        <PublicRoute
          authenticated={this.props.authenticated}
          path="/signup"
          component={SignUp}
        />
        <PublicRoute
          authenticated={this.props.authenticated}
          exact
          path="/"
          component={LogIn}
        />
        <PrivateRoute
          authenticated={this.props.authenticated}
          path="/home"
          component={Home}
        />
      </ConnectedRouter>
    )
  }
}
 
export default App
