import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () =>
  auth.signOut();

export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

export const doEmailUpdate = (email) =>
  auth.currentUser.updateEmail(email);

export const doDeleteAccount = () =>
  auth.currentUser.delete();

export const doReauthenticate = (credentials) =>
  auth.currentUser.reauthenticateWithCredential(credentials);

export const doCredentials = ({ email, password }) =>
  auth.EmailAuthProvider.credential(email, password);
