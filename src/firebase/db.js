import { db } from './firebase';

export const doCreateUser = (id, { email, name, surname, age, photoUrl, about }) =>
  db.ref(`users/${id}`).set({ email, name, surname, age, photoUrl, about });

export const doDeleteUser = (authorId) =>
  db.ref('/users/' + authorId).remove()

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doGetComments = (articleId) =>
  db.ref('comments/'+articleId).once('value');

export const doGetUserInfo = (userId) =>
  db.ref('users/'+userId).once('value');

export const doCreateArticle = (articleId, { title, body, authorId, authorEmail, authorAvatar, date }) =>
  db.ref('/articles/' + articleId).update({ title, body, authorId, authorEmail, authorAvatar, date });

export const doAddComment = (comment, commentId, articleId) =>
  db.ref().child('/comments/' + articleId + '/' + commentId).update(comment)

export const doEditArticle = (articleId, { title, body, lastEdit }) =>
  db.ref().child('/articles/' + articleId).update({ title, body, lastEdit })

export const doEditUserInfo = (userId, name, surname, age, about) =>
  db.ref().child('/users/'+userId).update({ name, surname, age, about })

export const doUpdateUserPhoto = (userId, photoUrl) =>
  db.ref().child('/users/'+userId).update({ photoUrl })

export const doDeleteArticle = (articleId) => {
  const updates = {};
  updates['/articles/' + articleId] = null
  updates['/comments/'+ articleId] = null
  return db.ref().update(updates)
}

export const onceGetArticles = () =>
  db.ref('articles').once('value');
