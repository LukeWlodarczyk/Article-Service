import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../actions/index';
import { Link } from 'react-router-dom';
import { PASSWORD_FORGET } from '../constants/routes';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

const handleFormSubmit = (signInUser, values) => {
  signInUser(values);
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

const SignIn = ({ authError, handleSubmit, signInUser}) => {
    return(
      <div className="container">
        <div className="">
          <h2 className="">Log In</h2>

          { authError && <div className="">{ authError }</div> }

          <form onSubmit={handleSubmit(handleFormSubmit.bind(null, signInUser))}>
            <Field name="email" component={renderField} className="" type="text" label="Email"/>
            <Field name="password" component={renderField} className="" type="password" label="Password"/>

            <button action="submit" className="">Sign In</button>
            <Link to={PASSWORD_FORGET}>forgot password{'?'}</Link>
          </form>
        </div>
      </div>
    );
  }


const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  }
}

export default connect(mapStateToProps, { signInUser }) (reduxForm({
  form: 'login',
  validate
})(SignIn));
