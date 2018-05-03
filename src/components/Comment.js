import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ authorId, authorEmail, date, comment }) => (
  <div>
    <Link to={'/users/'+authorId}><h3>{authorEmail}</h3></Link>
    <small>
      {new Date(date).toLocaleDateString('en-EN', {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'})}
    </small>
    <p>{comment}</p>
  </div>
)

export default Comment;
