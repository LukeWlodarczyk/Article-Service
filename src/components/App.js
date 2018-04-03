import React, { Component } from 'react';
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router-dom";
import { history } from "../store/store.js";
import { connect } from "react-redux";
import ReduxToastr from 'react-redux-toastr';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';
import Navigation from './Navigation';
import Account from '../containers/Account';
import AccountSettings from '../containers/AccountSettings';
import AddOffert from '../containers/AddOffert';
import Offerts from '../containers/Offerts';
import PasswordForgetForm from '../containers/PasswordForgetForm';
import * as routes from '../constants/routes';
import { PrivateRoute, SignInUpRoute } from './Routes';

import withRoot from './withRoot';

const App = ({ authenticated }) =>{
  console.log(authenticated);
    return (
      <ConnectedRouter history={history}>
        <div>
          <Navigation authenticated={authenticated} />
          <ReduxToastr
            timeOut={6000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="bounceInDown"
            transitionOut="bounceOutUp"
            progressBar
          />
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.OFFERTS} component={Offerts} />
          <PrivateRoute
            authenticated={authenticated}
            path={routes.ADD_OFFERT}
            component={AddOffert}
          />
          <PrivateRoute
            authenticated={authenticated}
            exact path={routes.ACCOUNT}
            component={Account}
          />
          <PrivateRoute
            authenticated={authenticated}
            exact path={routes.ACCOUNT_SETTINGS}
            component={AccountSettings}
          />
          <SignInUpRoute
            authenticated={authenticated}
            path={routes.SIGN_IN}
            component={SignIn}
          />
          <SignInUpRoute
            authenticated={authenticated}
            path={routes.SIGN_UP}
            component={SignUp}
          />
          <SignInUpRoute
            authenticated={authenticated}
            path={routes.PASSWORD_FORGET}
            component={PasswordForgetForm}
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
 
export default connect(mapStateToProps)(withRoot((App)))
