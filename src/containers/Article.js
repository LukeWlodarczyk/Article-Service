import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayArticle } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    article: state.articles.article
  }
}

class Article extends Component {

  componentDidMount() {
    console.log('hello');
    console.log(this.props.match.params.id);
    this.props.displayArticle(this.props.match.params.id)
  };

  render() {
    const { title, body } = this.props.article;
    return (
      <article>
        <h2>{title}</h2>
        <p>{body}</p>
      </article>
    );
  }
}



export default connect(mapStateToProps, { displayArticle })(Article);
