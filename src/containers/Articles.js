import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayArticles } from '../actions/index';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles
  }
}

class Articles extends Component {

  componentDidMount() {
    this.props.displayArticles();
  };


  showArticles = () => {
    return Object.keys(this.props.articles).map( key => this.props.articles[key]).map( el =>                 Object.entries(el).map(
        ([key, value]) => {
          return (
            <Link key={key} to={'/articles/'+key}> {value.title} </Link>
          )
        }
      )
    )
  }

  render() {

    return (
      <div>
        {this.showArticles()}
      </div>
    );
  }
}



export default connect(mapStateToProps, { displayArticles })(Articles);
