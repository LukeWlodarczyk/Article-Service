import React, { Component } from 'react';
import { connect } from "react-redux";

class Account extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.authenticated.emailVerified);
    const { emailVerified } = this.props.authenticated;
    if(!emailVerified) {
      return <p>Please verify your email</p>
    }
    return <p>account</p>
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
 
export default connect(mapStateToProps)(Account)
