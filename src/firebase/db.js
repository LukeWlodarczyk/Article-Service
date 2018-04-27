import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// export const doCreateArticle = (id, title, body, authorId) =>
//   db.ref(`articles/${id}`).set({
//     title,
//     body,
//     authorId
//   });

export const doCreateArticle = (id, title, body, authorId) => {
  const updates = {};
  updates['/articles/' + id] = {
    title,
    body,
    authorId
  };
  updates[`/${authorId}/${id}`] = {
    title,
    body,
    authorId
  };

  return db.ref().update(updates)
}

export const doShowArticle = (id) =>
  db.ref(`articles/4led3u5Cr3TXd476hKx6EPrDYBa2/${id}`).on('value', snapshot => {console.log('///',snapshot.val())} );

export const doEditArticle = (id, title, body, authorId) => {
  db.ref(`articles/${authorId}/${id}`).set({
    title,
    body,
    authorId
  });
}


export const onceGetArticles = () =>
  db.ref('articles').once('value');
