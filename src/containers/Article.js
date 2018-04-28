import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteArticle } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    userId: state.auth.authenticated.uid,
  }
}

class Article extends Component {

  deleteArticle = () => {
    console.log(this.props.match.params.id);
    this.props.deleteArticle(this.props.match.params.id)
  }

  render() {
    if(!this.props.articles || !this.props.articles[this.props.match.params.id]) {
      return <div>Loading</div>
    }

    const { title, body } = this.props.articles[this.props.match.params.id];
    return (
      <article>
        <h2>{title}</h2>
        <p>{body}</p>
        {this.props.userId === this.props.articles[this.props.match.params.id].authorId &&
          <div>
            <Link to={`/articles/${this.props.match.params.id}/edit`}> Edit </Link>
            <button onClick={this.deleteArticle}>Delete</button>
          </div>
        }
      </article>
    );

  }
}



export default connect(mapStateToProps, { deleteArticle })(Article);
