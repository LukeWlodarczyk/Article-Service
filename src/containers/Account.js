import React, { Component } from 'react';
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'

class Account extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { emailVerified } = this.props.authenticated;
    if(!emailVerified) {
      toastr.info('Please verify your email')
    }
  }

  render() {
    return <p>account</p>
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
 
export default connect(mapStateToProps)(Account)
