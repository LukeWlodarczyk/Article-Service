import { firebase, auth } from '../firebase/index';
import { push } from "react-router-redux";
import { SIGN_IN, PASSWORD_FORGET } from '../constants/routes'
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
        toastr.error(error.message)
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
      toastr.error(error.message)
    });
};

export const resetPassword = email => (dispatch) => {
  auth.doPasswordReset(email)
    .then( () => {
      dispatch(push(SIGN_IN));
      toastr.success('Check your email')
    })
    .catch(error => {
      dispatch(authError(error));
      toastr.error(error.message)
    });
};


export const secureSensitiveAction = (credentials, type, newData) => (dispatch) => {

  const credential = auth.doCredentials(credentials.email, credentials.password);

  auth.reauthenticateWithCredential(credential)
    .then( () => {
      console.log('User reauthenticated');
      type === 'passwordUpdate' && auth.doPasswordUpdate(newData)
      type === 'emailUpdate' && auth.doEmailUpdate(newData)
      type === 'deleteAccount' && auth.doDeleteAccount()
    })
    .catch(error => {
      dispatch(authError(error));
      toastr.error(error.message)
    });
};


// const toastrConfirmOptions = {
//   onOk: () => console.log('OK: clicked'),
//   onCancel: () => console.log('CANCEL: clicked')
// };
// toastr.confirm('Are you sure about that?', toastrConfirmOptions);
