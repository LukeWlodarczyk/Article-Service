import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    article: state.articles.article
  }
}

class Article extends Component {

  componentDidMount() {

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



export default connect(mapStateToProps)(Article);
