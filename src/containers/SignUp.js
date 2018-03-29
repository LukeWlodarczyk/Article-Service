import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { signUpUser } from "../actions/index.js";

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Please enter a password.";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please enter a password confirmation.";
  }
  if (values.password !== values.confirmPassword) {
    errors.password = "Passwords do not match.";
  }
  return errors;
}

  const renderSignUp = field => {
    const {input, label, type, meta: { touched, error } } = field;
    const className = `form-group${touched && error ? "has-error" : ""}`;
    return (
      <fieldset className={className}>
        <label className="control-label">{label}</label>
        <div>
          <input className="form-control" {...input} type={type} />
        </div>
        {touched && error && <div className="alert alert-danger">
              {error}
            </div>}
      </fieldset>
    );
  };

  const signUp = (signUpUser, values) => {
    signUpUser(values);
  };


const  SignUp = ({ authError, handleSubmit, signUpUser}) => {

  return(
    <div className="container">
      <div className="">
        <h2 className="text-center">Sign Up</h2>
        {authError && <div className="alert alert-danger"> {authError}  </div>}

        <form onSubmit={handleSubmit(signUp.bind(null, signUpUser))}>
          <Field name="email" component={renderSignUp} label="Email" type="email" />
          <Field name="password" component={renderSignUp} label="Password" type="password" />
          <Field name="confirmPassword" component={renderSignUp} label="Confirm password" type="password" />
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <div>
          <Link to="/signin" className="btn">
            Already a member{'?'} yet Log in
          </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  };
}
export default connect(mapStateToProps, { signUpUser })(
  reduxForm({
    form: "signUp",
    validate: validate
  })(SignUp)
);
