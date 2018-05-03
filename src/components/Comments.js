import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';

const Comments = ({ comments }) => {
  return (
    Object.entries(comments).reverse().map( ([key, value]) => {
      console.log(key);
      return (
        <Comment
          key={key}
          authorId={value.authorId}
          authorEmail={value.authorEmail}
          date={value.date}
          comment={value.comment}
        />
      )
    })
  )
}

export default Comments;
