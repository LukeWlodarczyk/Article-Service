import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ comments }) => {
  return (
    Object.entries(comments).reverse().map( ([key, value]) => {
      return (
        <div key={key} >
          <Link to={'/users/'+value.authorId}><h3>{value.authorEmail}</h3></Link>
          <small>
            {new Date(value.date).toLocaleDateString('en-EN', {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'})}
          </small>
          <p>{value.comment}</p>
        </div>
      )
    })
  )
}

export default Comments;
