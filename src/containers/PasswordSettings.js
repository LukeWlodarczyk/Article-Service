import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';

const validate = values => {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = "Please enter a password.";
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Please enter a password confirmation.";
  }

  if (!values.currentPassword) {
    errors.currentPassword = "Please enter your current password.";
  }

  if (values.newPassword && values.currentPassword === values.newPassword) {
    errors.newPassword = "New password can't be the same as current password";
  }

  if (values.newPassword !== values.confirmNewPassword) {
    errors.newPassword = "Passwords do not match.";
  }

  return errors;
};


class PasswordSettings extends Component {


  handleChangePassword = (values) => {
    this.props.secureSensitiveAction(values.currentPassword, 'passwordUpdate', values.newPassword);
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Change password</h2>
          <form onSubmit={handleSubmit(this.handleChangePassword)}>
            <Field name="newPassword" component={renderTextField} className="" type="password" label="New password"/>
            <Field name="confirmNewPassword" component={renderTextField} className="" type="password" label="Confirm new password"/>
            <Field name="currentPassword" component={renderTextField} className="" type="password" label="Current password"/>
            <Button variant="raised" type="submit" color="primary" className="button-submit" >
              Change password
            </Button>
          </form>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'passwordSettings',
  validate
})(PasswordSettings);
