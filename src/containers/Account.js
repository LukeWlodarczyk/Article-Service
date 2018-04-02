import React, { Component } from 'react';
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

class Account extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { emailVerified } = this.props.authenticated;
    if(!emailVerified) {
      toastr.info('Please verify your email')
    }
    let id = this.props.match.params.id
    console.log(id);
  }

  render() {
    return (
      <div>
        <p>Account</p>
        <Link className="" to={"/users/"+this.props.match.params.id+"/settings"}>Settings</Link>
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
