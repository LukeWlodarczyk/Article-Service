import { firebase, auth, db } from '../firebase/index';
import { reset } from 'redux-form';
import { replace, push } from "react-router-redux";
import { SIGN_IN, ACCOUNT, ARTICLES } from '../constants/routes'
import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER, DISPLAY_ARTICLES, DISPLAY_ARTICLE, DISPLAY_COMMENTS, DISPLAY_USER_INFO } from '../constants/action-types';
import { toastr } from 'react-redux-toastr'

export const replaceUrl = (url) => dispatch => {
    dispatch(replace(url))
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
      toastr.success('Welcome! Check your email to verify your email!');

      const userInfo = {
        name: '',
        surname: '',
        email,
        age: '',
        photoUrl: 'http://simpleicon.com/wp-content/uploads/user1.png',
        about: ''
      }

      db.doCreateUser(user.uid, userInfo)
          .then(() => {
            toastr.success('Update your profile info!');
          })
          .catch(error => {
            toastr.error(error.message)
          });

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
            dispatch(push('users'+firebase.auth.currentUser.uid));
            toastr.success('Password updated!');
          })
          .catch(error => {
            dispatch(reset('passwordSettings'))
            toastr.error(error.message);
          })

      type === 'emailUpdate' &&
        auth.doEmailUpdate(newData)
          .then( () => {
            dispatch(push('users'+firebase.auth.currentUser.uid));
            toastr.success('Email updated!');
          })
          .catch(error => {
            dispatch(reset('emailSettings'))
            toastr.error(error.message);
          })

      type === 'deleteAccount' &&
        auth.doDeleteAccount()
          .then( () => {
            dispatch(push(ARTICLES));
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

export const displayComments = (articleId) => (dispatch) => {
  db.doGetComments(articleId)
    .then( snapshot => {
      dispatch({
        type: DISPLAY_COMMENTS,
        payload: snapshot.val()
      })
    })
    .catch( error => {
      toastr.error("Sorry, we couldn't get comments from database.")
    })
};

export const displayUserInfo = (userId) => (dispatch) => {
  db.doGetUserInfo(userId)
    .then( snapshot => {
      dispatch({
        type: DISPLAY_USER_INFO,
        payload: snapshot.val()
      })
    })
    .catch( error => {
      toastr.error("Sorry, we couldn't get user info from database.")
    })
};

export const createArticle = ({ title, body }) => (dispatch) => {
  const authorId = firebase.auth.currentUser.uid;
  const articleId = firebase.db.ref('/').child('articles').push().key;
  const date = new Date();
  db.doCreateArticle(articleId, {title, body, authorId, date})
    .then(() => {
      toastr.success('Article successfully added!');
      displayArticles()(dispatch);
      dispatch(push(`/articles/${articleId}`));
    })
    .catch(error => {
      toastr.error("Sorry, we couldn't create new article. Try again!")
    });
};

export const editArticle = (articleId, { title, body }) => (dispatch) => {
  db.doEditArticle(articleId, title, body)
    .then(() => {
      toastr.success('Article successfully edited!');
      displayArticles()(dispatch);
      dispatch(push(`/articles/${articleId}`));
    })
    .catch(error => {
      toastr.error("Sorry, we couldn't edit this article. Try again!")
    });
};

export const addComment = (articleId, comment) => (dispatch) => {
  const commentId = firebase.db.ref('/').child('comments/'+articleId).push().key;
  const date = new Date();
  const commentObj = {
    date,
    comment,
    authorId: firebase.auth.currentUser.uid,
    authorEmail: firebase.auth.currentUser.email
  }
  db.doAddComment(commentObj, commentId, articleId)
    .then(() => {
      toastr.success('Comment successfully added!');
      dispatch(reset('addComment'));
      dispatch(push(`/articles/${articleId}`));
      displayComments(articleId)(dispatch);
    })
    .catch(error => {
      toastr.error("Sorry, we couldn't add comment. Try again!")
    });
};

export const deleteArticle = (password, articleId) => (dispatch) => {
  const credential = auth.doCredentials({ email: firebase.auth.currentUser.email, password });
  auth.doReauthenticate(credential)
    .then( () => {
      const authorId = firebase.auth.currentUser.uid;
      db.doDeleteArticle(articleId, authorId)
        .then(() => {
          toastr.success('Article successfully deleted!');
          displayArticles()(dispatch);
          dispatch(push('/'));
        })
        .catch(error => {
          toastr.error("Sorry, we couldn't delete this article. Try again!")
        });
    })
    .catch(error => {
      dispatch(authError(error));
      toastr.error('Wrong password!')
    });
};
