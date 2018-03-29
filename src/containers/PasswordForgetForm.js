import React, { Component } from 'react';


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

const PasswordForgetForm = (({ authError, handleSubmit, signUpUser})) => {

  return (
    <form onSubmit={}>
      <Field name="email" component={renderSignUp} label="Email" type="email" />
      <button action="submit" className="">Reset My Password</button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  }
}

export default connect(mapStateToProps, { signInUser }) (reduxForm({
  form: 'resetPassword',
  validate
})(PasswordForgetForm));
