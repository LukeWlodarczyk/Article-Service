import { firebase, auth, db } from '../firebase/index';
import { reset } from 'redux-form';
import { push } from "react-router-redux";
import { SIGN_IN, ACCOUNT, HOME } from '../constants/routes'
import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER, DISPLAY_ARTICLES, DISPLAY_ARTICLE } from '../constants/action-types';
import { toastr } from 'react-redux-toastr'

export const pushUrl = (url) => dispatch => {
    dispatch(push(url))
};

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
            dispatch(push(ACCOUNT));
            toastr.success('Password updated!');
          })
          .catch(error => {
            dispatch(reset('passwordSettings'))
            toastr.error(error.message);
          })

      type === 'emailUpdate' &&
        auth.doEmailUpdate(newData)
          .then( () => {
            dispatch(push(ACCOUNT));
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


export const createArticle = ({ title, body }) => (dispatch) => {
  const authorId = firebase.auth.currentUser.uid;
  // const articleId = `${authorId}/${new Date().getTime()}`
  const articleId = db.ref('/').child('articles').push().key;
  db.doCreateArticle(articleId, title, body, authorId)
    .then(() => {
      toastr.success('Article successfully added!');
      dispatch(pushUrl(`/articles/${articleId}`));
    })
    .catch(error => {
      toastr.error("Sorry, we couldn't create new article. Try again!")
    });
};


export const displayArticles = () => (dispatch) => {
  db.onceGetArticles()
    .then( snapshot => {
      dispatch({
        type: DISPLAY_ARTICLES,
        payload: snapshot.val()
      })
    })
    .catch( error => {
      toastr.error("Sorry, we couldn't get articles from database.")
    })
};

export const displayAarticle = (id) => (dispatch) => {
  console.log(id);
  db.doShowArticle(id)
    .then( article => {
      console.log(article);
      dispatch({
        type: DISPLAY_ARTICLE,
        payload: article
      })
    })
    .catch( error => {
      toastr.error("Sorry, we couldn't get this article from database.")
    })
};

export const displayArticle = (id) => (dispatch) => {
  console.log(id);
  db.doShowArticle(id)
}
