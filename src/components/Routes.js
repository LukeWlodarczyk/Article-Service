import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { HOME } from '../constants/routes'


export const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated.uid !== 'guest' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )
      }
    />
  );
};

export const SignInUpRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated.uid === 'guest' ? (
          <Component {...props} />
        ) : (
          <Redirect to={HOME} />
        )
      }
    />
  );
};
