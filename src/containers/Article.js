import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    userId: state.auth.authenticated.uid,
  }
}

class Article extends Component {


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
          <Link to={`/articles/${this.props.match.params.id}/edit`}> Edit </Link>
        }
      </article>
    );

  }
}



export default connect(mapStateToProps)(Article);
