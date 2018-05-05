import { firebase, auth, db, storage } from '../firebase/index';
import { reset } from 'redux-form';
import { replace, push } from "react-router-redux";
import { SIGN_IN, ACCOUNT, ARTICLES } from '../constants/routes'
import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER, DISPLAY_ARTICLES, DISPLAY_ARTICLE, DISPLAY_COMMENTS, DISPLAY_USER_INFO } from '../constants/action-types';
import { toastr } from 'react-redux-toastr';
import { initialUserInfo } from '../helpers/initialUserInfo';

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

export const signOutUser = () => async (dispatch) => {
  try {
    await auth.doSignOut()
    dispatch(deauthUser());
    toastr.success('You have been logged out.')
  } catch (e) {
    toastr.error(e.message)
  }
};

export const signInUser = ({ email, password }) => async (dispatch) =>{
  try {
    const user = await auth.doSignInWithEmailAndPassword(email, password);
    dispatch(authUser(user));
    toastr.success('Welcome!')
  } catch (e) {
    toastr.error(e.message);
    dispatch(reset('signin'));
    dispatch(authError(e));
  }
};


export const signUpUser = ({ email, password }) => async (dispatch) => {
  try {
    const user = await auth.doCreateUserWithEmailAndPassword(email, password);

    await Promise.all([
      user.sendEmailVerification(),
      user.updateProfile({
        photoURL: initialUserInfo.photoUrl
      }),
      db.doCreateUser(user.uid, { ...initialUserInfo, email })
    ]);

    toastr.success('Welcome! Check your email to verify your account!');
    toastr.success('Update your profile info!');
  } catch (e) {
    dispatch(authError(e));
    dispatch(reset('signup'));
    toastr.error(e.message)
  }
};

export const resetPassword = email => async (dispatch) => {
    try {
      await auth.doPasswordReset(email);
      dispatch(push(SIGN_IN));
      toastr.success('Check your email!');
    } catch (e) {
      dispatch(authError(e));
      dispatch(reset('resetPassword'));
      toastr.error(e.message);
    };
};


export const secureSensitiveAction = (password, type, newData) => (dispatch) => {

  const credential = auth.doCredentials({ email: firebase.auth.currentUser.email, password });

  auth.doReauthenticate(credential)
    .then( () => {
      console.log('User reauthenticated');
      const uid = firebase.auth.currentUser.uid;

      type === 'passwordUpdate' &&
        auth.doPasswordUpdate(newData)
          .then( () => {
            dispatch(push('users'+uid));
            toastr.success('Password updated!');
          })
          .catch(error => {
            dispatch(reset('passwordSettings'))
            toastr.error(error.message);
          })

      type === 'emailUpdate' &&
        auth.doEmailUpdate(newData)
          .then( () => {
            dispatch(push('users'+uid));
            toastr.success('Email updated!');
          })
          .catch(error => {
            dispatch(reset('emailSettings'))
            toastr.error(error.message);
          })

      type === 'deleteAccount' &&
        auth.doDeleteAccount()
          .then( () => {
            db.doDeleteUser(uid)
            .then( () => {
              dispatch(push(ARTICLES));
              toastr.success('Account successfully deleted!');
            })
            .catch(error => {
              toastr.error(error.message);
            })
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

export const displayArticles = () => async (dispatch) => {
    try {
      const snapshot = await db.onceGetArticles();
      dispatch({
        type: DISPLAY_ARTICLES,
        payload: snapshot.val()
      })
    } catch (e) {
      toastr.error("Sorry, we couldn't get articles from database.")
    };
};

export const displayComments = (articleId) => async (dispatch) => {
    try {
      const snapshot = await db.doGetComments(articleId);
      dispatch({
        type: DISPLAY_COMMENTS,
        payload: snapshot.val()
      })
    } catch (e) {
      toastr.error("Sorry, we couldn't get comments from database.")
    };
};

export const displayUserInfo = (userId) => async (dispatch) => {
    try {
      const snapshot = await db.doGetUserInfo(userId);
      const payload = snapshot.val() !== null ? snapshot.val() : { ...initialUserInfo, email: 'USER DELETED' };
      dispatch({
        type: DISPLAY_USER_INFO,
        payload
      })
    } catch (e) {
        toastr.error("Sorry, we couldn't get user info from database.");
    };
};

export const createArticle = ({ title, body }) => async (dispatch) => {
  try {
    // if(!firebase.auth.currentUser.emailVerified) {
    //   return toastr.error("Only verified users are allowed to add articles!")
    // }
    const articleId = firebase.db.ref('/').child('articles').push().key;
    const { uid: authorId, email: authorEmail, photoURL: authorAvatar } = firebase.auth.currentUser;
    const date = new Date();
    await db.doCreateArticle(articleId, { title, body, authorId, authorEmail, authorAvatar, date });
    toastr.success('Article successfully added!');
    displayArticles()(dispatch);
    dispatch(push(`/articles/${articleId}`));
  } catch (e) {
    toastr.error("Sorry, we couldn't create new article. Try again!");
  }
};

export const editUserInfo = (userId, { name, surname, age, about }) => async (dispatch) => {
  try {
    await db.doEditUserInfo(userId, name, surname, age, about);
    toastr.success('User-info successfully updated!');
    displayUserInfo(userId)(dispatch);
    dispatch(push(`/users/${userId}`));
  } catch (e) {
    toastr.error("Sorry, we couldn't update user-info. Try again!");
  };
};


export const updateUserPhoto = (userId, photo) => async (dispatch) => {
  try {
    const snapshot = await storage.doUpdateUserPhoto(userId, photo);

    await Promise.all([
      db.doUpdateUserPhoto(userId, snapshot.metadata.downloadURLs[0]),
      firebase.auth.currentUser.updateProfile({
        photoURL: snapshot.metadata.downloadURLs[0]
      })
    ]);

    toastr.success('User-image successfully updated!');
    dispatch(push(`/users/${userId}`));
  } catch (e) {
    toastr.error(e.message);
  }
};

export const editArticle = (articleId, { title, body }) => async (dispatch) => {
  try {
    const lastEdit = new Date();
    await db.doEditArticle(articleId, { title, body, lastEdit });
    toastr.success('Article successfully edited!');
    displayArticles()(dispatch);
    dispatch(push(`/articles/${articleId}`));
  } catch (e) {
    toastr.error("Sorry, we couldn't edit this article. Try again!");
  };
};

export const addComment = (articleId, comment) => async (dispatch) => {
    try {
      // if(!firebase.auth.currentUser.emailVerified) {
      //   return toastr.error("Only verified users are allowed to add comments!")
      // }
      const commentId = firebase.db.ref('/').child('comments/'+articleId).push().key;
      const date = new Date();
      const commentObj = {
        date,
        comment,
        authorId: firebase.auth.currentUser.uid,
        authorEmail: firebase.auth.currentUser.email,
        authorAvatar: firebase.auth.currentUser.photoURL
      }
      await db.doAddComment(commentObj, commentId, articleId)
      toastr.success('Comment successfully added!');
      dispatch(reset('addComment'));
      displayComments(articleId)(dispatch);
    } catch (e) {
      toastr.error("Sorry, we couldn't add comment. Try again!")
    }
};

export const deleteArticle = (password, articleId) => async (dispatch) => {
    try {
      const credential = auth.doCredentials({ email: firebase.auth.currentUser.email, password });
      await auth.doReauthenticate(credential);
      await db.doDeleteArticle(articleId);
      toastr.success('Article successfully deleted!');
      displayArticles()(dispatch);
      dispatch(push('/'));
    } catch (e) {
      dispatch(authError(e));
      e.message.includes('password') ? toastr.error('Wrong password!') : toastr.error(e.message)
    }
};
