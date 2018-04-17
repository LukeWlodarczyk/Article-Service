import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doCreateArticle = (id, title, body) =>
  db.ref(`articles/${id}`).set({
    title,
    body,
  });

export const onceGetArticles = () =>
  db.ref('articles').once('value');
