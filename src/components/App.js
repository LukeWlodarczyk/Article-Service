import React, { Component } from 'react';
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router-dom";
import { history } from "../store/store.js";
import { connect } from "react-redux";
import ReduxToastr from 'react-redux-toastr';
import { compose } from '../helpers/compose';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Navigation from './Navigation';
import Account from '../containers/Account';
import AccountSettings from '../containers/AccountSettings';
import AddArticle from '../containers/AddArticle';
import EditArticle from '../containers/EditArticle';
import Articles from '../containers/Articles';
import Article from '../containers/Article';
import PasswordForgetForm from '../containers/PasswordForgetForm';
import { displayArticles } from '../actions/index';
import * as routes from '../constants/routes';
import { PrivateRoute, SignInUpRoute } from './Routes';

import withRoot from './withRoot';

class App extends Component {

  componentDidMount() {
    this.props.displayArticles();
  };

  render() {
    const { authenticated } = this.props;
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
          <Route exact path={routes.ARTICLES} component={Articles} />
          <PrivateRoute
            exact
            authenticated={authenticated}
            path={routes.ADD_ARTICLE}
            component={AddArticle}
          />
          <Route exact path={routes.ARTICLE} component={Article} />
          <PrivateRoute
            exact
            authenticated={authenticated}
            path={routes.EDIT_ARTICLE}
            component={EditArticle}
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
}


const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
 
export default compose(
  connect(mapStateToProps, { displayArticles }),
  withRoot
)(App)
