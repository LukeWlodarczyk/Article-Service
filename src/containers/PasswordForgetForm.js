import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/index';
import { history } from '../store/store';
import { SIGN_IN } from '../constants/routes'


const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className="control-label">{label}</label>
    <div>
      <input {...input} placeholder={label} className="form-control" type={type} />
      {touched && error && <div className="help-block">{error}</div>}
    </div>
  </fieldset>
);

const handleResetPassword = (resetPassword, { email }) => {
  resetPassword(email);
  history.push(SIGN_IN);
};

const PasswordForgetForm = ({ authError, handleSubmit, resetPassword }) => {
  return (
    <form onSubmit={handleSubmit(handleResetPassword.bind(null, resetPassword))}>
      <Field name="email" component={renderField} label="Email" type="email" />
      <button action="submit" className="">Reset My Password</button>
    </form>

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
