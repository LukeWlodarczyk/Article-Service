import { db } from './firebase';

export const doCreateUser = (id, {name, surname, age, photoUrl, about}) =>
  db.ref(`users/${id}`).set({
    name,
    surname,
    age,
    photoUrl,
    about
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doGetComments = (articleId) =>
  db.ref('comments/'+articleId).once('value');

export const doGetUserInfo = (userId) =>
  db.ref('users/'+userId).once('value');

export const doCreateArticle = (articleId, {title, body, authorId, date}) => {
  const updates = {};
  updates['/articles/' + articleId] = {
    date,
    title,
    body,
    authorId,
  };
  return db.ref().update(updates)
}

export const doAddComment = (comment, commentId, articleId) =>
  db.ref().child('/comments/' + articleId + '/' + commentId).update(comment)

export const doEditArticle = (articleId, title, body, authorId) =>
  db.ref().child('/articles/' + articleId).update({ title, body })

export const doEditUserInfo = (userId, name, surname, age, about) =>
  db.ref().child('/users/'+userId).update({ name, surname, age, about })

export const doUpdateUserPhoto = (userId, photoUrl) =>
  db.ref().child('/users/'+userId).update({ photoUrl })

export const doDeleteArticle = (articleId, authorId) => {
  const updates = {};
  updates['/articles/' + articleId] = null
  updates[`/${authorId}/${articleId}`] = null
  updates['comments/'+ articleId] = null
  return db.ref().update(updates)
}

export const onceGetArticles = () =>
  db.ref('articles').once('value');
