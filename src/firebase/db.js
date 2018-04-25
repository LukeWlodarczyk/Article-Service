import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doCreateArticle = (id, title, body, authorId) =>
  db.ref(`articles/${id}`).set({
    title,
    body,
    authorId
  });

export const doEditArticle = (id, title, body, authorId) => {
  db.ref(`articles/${authorId}/${id}`).set({
    title,
    body,
    authorId
  });
}


export const onceGetArticles = () =>
  db.ref('articles').once('value');
