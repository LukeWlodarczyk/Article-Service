import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');


export const doCreateArticle = (articleId, title, body, authorId) => {
  const updates = {};
  updates['/articles/' + articleId] = {
    title,
    body,
    authorId
  };
  updates[`/${authorId}/${articleId}`] = {
    title,
    body,
    authorId
  };
  return db.ref().update(updates)
}

export const doEditArticle = (articleId, title, body, authorId) => {
  const updates = {};
  updates['/articles/' + articleId] = {
    title,
    body,
    authorId
  };
  updates[`/${authorId}/${articleId}`] = {
    title,
    body,
    authorId
  };
  return db.ref().update(updates)
}

export const doDeleteArticle = (articleId, authorId) => {
  const updates = {};
  updates['/articles/' + articleId] = null
  updates[`/${authorId}/${articleId}`] = null
  return db.ref().update(updates)
}




export const onceGetArticles = () =>
  db.ref('articles').once('value');
