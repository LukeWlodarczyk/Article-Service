import React, { Component } from 'react';
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { ACCOUNT_SETTINGS } from '../constants/routes'

class Account extends Component {

  componentDidMount() {
    const { emailVerified } = this.props.authenticated;
    if(!emailVerified) {
      toastr.info('Please verify your email')
    }
  }

  render() {
    return (
      <div>
        <p>Account</p>
        <Link className="" to={"/profile/settings"}>Settings</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
 
export default connect(mapStateToProps)(Account)
