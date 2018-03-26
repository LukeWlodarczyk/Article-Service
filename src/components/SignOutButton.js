import React from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/index';

const SignOutButton = ({ signOutUser }) =>
  <button onClick={signOutUser} >
    Sign Out
  </button>

export default connect(null, { signOutUser })(SignOutButton);
