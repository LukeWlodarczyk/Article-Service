import { firebase, auth } from '../firebase/index';
import { reset } from 'redux-form';
import { push, goBack } from "react-router-redux";
import { SIGN_IN, ACCOUNT, HOME } from '../constants/routes'
import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../constants/action-types';
import { toastr } from 'react-redux-toastr'




export const verifyAuth = () => dispatch => {
    firebase.auth.onAuthStateChanged( user => {
      if (user) {
        dispatch(authUser(user));
      } else {
        dispatch(deauthUser());
      }
    });
};

export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user
  };
};

export const deauthUser = () => {
  return {
    type: SIGN_OUT_USER
  }
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const signOutUser = () => dispatch => {
  auth.doSignOut()
        .then(() => {
          dispatch(deauthUser());
          toastr.success('You have been logged out.')
        });
};



export const signInUser = ({ email, password }) => (dispatch) =>{
    auth.doSignInWithEmailAndPassword(email, password)
      .then( user => {
        dispatch(authUser(user));
        toastr.success('Welcome!')
      })
      .catch(error => {
        toastr.error(error.message);
        dispatch(reset('signin'));
        dispatch(authError(error));
      });
};


export const signUpUser = ({ email, password }) => (dispatch) => {
  auth.doCreateUserWithEmailAndPassword(email, password)
    .then( user => {
      user.sendEmailVerification();
      toastr.success('Welcome!')
    })
    .catch(error => {
      dispatch(authError(error));
      dispatch(reset('signup'));
      toastr.error(error.message)
    });
};

export const resetPassword = email => (dispatch) => {
  auth.doPasswordReset(email)
    .then( () => {
      dispatch(push(SIGN_IN));
      toastr.success('Check your email');
    })
    .catch(error => {
      dispatch(authError(error));
      dispatch(reset('resetPassword'));
      toastr.error(error.message)
    });
};


export const secureSensitiveAction = (password, type, newData) => (dispatch) => {

  const credential = auth.doCredentials({ email: firebase.auth.currentUser.email, password });
  
  auth.doReauthenticate(credential)
    .then( () => {
      console.log('User reauthenticated');

      type === 'passwordUpdate' &&
        auth.doPasswordUpdate(newData)
          .then( () => {
            dispatch(goBack());
            toastr.success('Password updated!');
          })
          .catch(error => {
            dispatch(reset('passwordSettings'))
            toastr.error(error.message);
          })

      type === 'emailUpdate' &&
        auth.doEmailUpdate(newData)
          .then( () => {
            dispatch(goBack());
            toastr.success('Email updated!');
          })
          .catch(error => {
            dispatch(reset('emailSettings'))
            toastr.error(error.message);
          })

      type === 'deleteAccount' &&
        auth.doDeleteAccount()
          .then( () => {
            dispatch(push(HOME));
            toastr.success('Account successfully deleted!');
          })
          .catch(error => {
            toastr.error(error.message);
          })
    })
    .catch(error => {
      dispatch(authError(error));
      dispatch(reset('passwordSettings'))
      dispatch(reset('emailSettings'))
      toastr.error('Wrong password!')
    });
};
