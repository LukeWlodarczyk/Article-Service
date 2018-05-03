import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteArticle, addComment, displayComments } from '../actions/index';
import Button from 'material-ui/Button';
import DeleteModal from './DeleteModal';
import AddComment from './AddComment';
import Comments from '../components/Comments';


const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    comments: state.articles.comments,
    userId: state.auth.authenticated.uid,
  }
}

class Article extends Component {

  deleteArticle = () => {
    this.props.deleteArticle(this.props.match.params.id)
  }

  componentDidMount() {
    this.props.displayComments(this.props.match.params.id);
    console.log(this.props.comments);
  }

  render() {
    if(!this.props.articles || !this.props.articles[this.props.match.params.id]) {
      return <div>Loading</div>
    }

    const { title, body, date } = this.props.articles[this.props.match.params.id];
    return (
      <article>
        <h2>{title}</h2>
        <small>
          {new Date(date).toLocaleDateString('en-EN', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
        </small>
        <p>{body}</p>
        {this.props.userId === this.props.articles[this.props.match.params.id].authorId &&
          <div>
            <Link to={`/articles/${this.props.match.params.id}/edit`}> Edit </Link>
            <DeleteModal
              parameter={this.props.match.params.id}
              dialogContentText='This operation is permanent. Type in your password if you really want to delete this article.'
              buttonText='Delete Article'
              secureSensitiveAction={this.props.deleteArticle}
            />
          </div>
        }
        {this.props.userId !== 'guest' ?
          <AddComment
            articleId={this.props.match.params.id}
            addComment={this.props.addComment}
          /> :
          <p><Link to='/signup'>Register</Link> or <Link to='/signin'>log in</Link> to add comments.</p>
      }
        {this.props.comments && <Comments comments={this.props.comments} />}
      </article>
    );

  }
}



export default connect(mapStateToProps, { deleteArticle, addComment, displayComments })(Article);
