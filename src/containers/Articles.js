import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
}

class Articles extends Component {

  render() {
    return (
      <div>
        {this.props.articles ?

          Object.entries(this.props.articles).map( ([key, value]) => {
            return <Link key={key} to={'/articles/'+key}> {value.title} </Link>
          }) :

        <div>No result!</div>}
      </div>
    );
  }
}



export default connect(mapStateToProps)(Articles);
