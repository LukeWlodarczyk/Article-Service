import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
}

class Article extends Component {

  componentDidMount() {

  };

  render() {
    return (
      <div>Article</div>
    );
  }
}



export default connect(mapStateToProps)(Article);
