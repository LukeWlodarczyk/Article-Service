import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/index';
import { renderTextField } from '../helpers/reduxFormField';


const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors;
};

const handleResetPassword = (resetPassword, { email }) => {
  resetPassword(email);
};

const PasswordForgetForm = ({ handleSubmit, resetPassword }) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleResetPassword.bind(null, resetPassword))}>
        <Field name="email" component={renderTextField} label="Email" type="email" />
        <Button variant="raised" type="submit" color="primary" className="button-submit" >
          Reset password
        </Button>
      </form>
    </div>

  );
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  }
}

export default connect(mapStateToProps, { resetPassword }) (reduxForm({
  form: 'resetPassword',
  validate
})(PasswordForgetForm));
