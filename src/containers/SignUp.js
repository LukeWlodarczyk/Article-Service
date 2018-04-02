import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { signUpUser } from "../actions/index.js";
import { SIGN_IN } from '../constants/routes';
import { renderTextField } from '../helpers/reduxFormField';

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

const signUp = (signUpUser, values) => {
  signUpUser(values);
};


const  SignUp = ({ handleSubmit, signUpUser }) => {

  return(
    <div className="container">
      <div className="">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(signUp.bind(null, signUpUser))}>
          <Field name="email" component={renderTextField} label="Email" type="email" />
          <Field name="password" component={renderTextField} label="Password" type="password" />
          <Field name="confirmPassword" component={renderTextField} label="Confirm password" type="password" />
          <RaisedButton type="submit" label="Sign Up" className="button-submit" primary={true} />
          <Link to={SIGN_IN} className="btn">
            Already a member{'?'} yet Log in
          </Link>
        </form>
      </div>
    </div>
  )
}

export default connect(null, { signUpUser })(
  reduxForm({
    form: "signup",
    validate: validate
  })(SignUp)
);
