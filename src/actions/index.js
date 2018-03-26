import { firebase, auth } from '../firebase/index';
import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../constants/action-types';




export const verifyAuth = () => dispatch => {
    firebase.auth.onAuthStateChanged( user => {
      if (user) {
        dispatch(authUser(user));
      } else {
        dispatch(signOutUser());
      }
    });
}

export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user
  };
}
export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const signOutUser = () => dispatch => {
  auth.doSignOut()
        .then(() => {
          dispatch({
            type: SIGN_OUT_USER
          });
        });

}

export const signInUser = ({ email, password }) => (dispatch) =>{
    auth.doSignInWithEmailAndPassword(email, password)
      .then( user => {
        dispatch(authUser(user));
      })
      .catch(error => {
        dispatch(authError(error));
      });
}


export const signUpUser = ({ email, password }) => (dispatch) => {
  console.log('start');
  auth.doCreateUserWithEmailAndPassword(email, password)
    .then( user => {
      dispatch(authUser(user));
      console.log('success');
    })
    .catch(error => {
      dispatch(authError(error));
      console.log(error);
    });
}
