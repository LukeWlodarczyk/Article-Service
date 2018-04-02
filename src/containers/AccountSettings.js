import React, { Component } from 'react';
import { connect } from 'react-redux';
import { secureSensitiveAction } from '../actions/index';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import DeleteAccount from './DeleteAccount'

class AccountSettings extends Component {

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <PasswordSettings secureSensitiveAction={this.props.secureSensitiveAction} />
        <EmailSettings secureSensitiveAction={this.props.secureSensitiveAction} />
        <DeleteAccount secureSensitiveAction={this.props.secureSensitiveAction} />
      </div>
    );
  }
}


export default connect(null, { secureSensitiveAction })(AccountSettings);
