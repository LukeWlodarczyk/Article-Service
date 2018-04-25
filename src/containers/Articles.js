import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayArticle } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
}

class Articles extends Component {

  componentDidMount() {
    this.props.displayArticle();
  };

  render() {
    return (
      <div>Articles public</div>
    );
  }
}



export default connect(mapStateToProps, { displayArticle })(Articles);
