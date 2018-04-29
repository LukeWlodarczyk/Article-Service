import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ comments }) => {
  return (
    Object.entries(comments).reverse().map( ([key, value]) => {
      return (
        <div key={key} >
          <Link to={'/users/'+value.authorId}><small>{value.authorEmail}</small></Link>
          <p>{value.comment}</p>
        </div>
      )
    })
  )
}

export default Comments;
