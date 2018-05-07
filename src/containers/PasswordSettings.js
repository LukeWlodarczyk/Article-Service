import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { withStyles } from 'material-ui/styles';
import { compose } from '../helpers/compose';


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

const styles = theme => ({
    button: {
      marginTop: '2em',
      width: '80%',
      maxWidth: '600px',
    },
    field: {
      maxWidth: '600px',
      width: '80%',
    }

});


class PasswordSettings extends Component {

  handleChangePassword = (values) => {
    this.props.updatePassword(values.currentPassword, values.newPassword);
  };

  render() {
    const { handleSubmit, classes } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="form-heading">Change password</h2>
          <form className="form form-changePassword" onSubmit={handleSubmit(this.handleChangePassword)}>
            <Field name="newPassword" component={renderTextField} className={classes.field} type="password" label="New password"/>
            <Field name="confirmNewPassword" component={renderTextField} className={classes.field} type="password" label="Confirm new password"/>
            <Field name="currentPassword" component={renderTextField} className={classes.field} type="password" label="Current password"/>
            <Button variant="raised" type="submit" color="primary" className={classes.button} >
              Change password
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  reduxForm({
    form: 'passwordSettings',
    validate
  })
)(PasswordSettings)
