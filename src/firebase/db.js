import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doGetComments = (articleId) =>
  db.ref('comments/'+articleId).once('value');

export const doCreateArticle = (articleId, title, body, authorId) => {
  const updates = {};
  updates['/articles/' + articleId] = {
    title,
    body,
    authorId,
  };
  // updates[`/${authorId}/${articleId}`] = {
  //   title,
  //   body,
  //   authorId,
  // };
  return db.ref().update(updates)
}

export const doAddComment = (comment, commentId, articleId) =>
  db.ref().child('/comments/' + articleId + '/' + commentId).update(comment)



export const doEditArticle = (articleId, title, body, authorId) =>
  db.ref().child('/articles/' + articleId).update({ title, body })

export const doDeleteArticle = (articleId, authorId) => {
  const updates = {};
  updates['/articles/' + articleId] = null
  updates[`/${authorId}/${articleId}`] = null
  updates['comments/'+ articleId] = null
  return db.ref().update(updates)
}


export const onceGetArticles = () =>
  db.ref('articles').once('value');
