import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { signInUser } from '../actions/index';
import { Link } from 'react-router-dom';
import { PASSWORD_FORGET } from '../constants/routes';
import { renderTextField } from '../helpers/reduxFormField';

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


const SignIn = ({ handleSubmit, signInUser }) => {
    return(
      <div className="container">
        <div className="">
          <h2 className="">Log In</h2>
          <form onSubmit={handleSubmit(handleFormSubmit.bind(null, signInUser))}>
            <Field name="email" component={renderTextField} className="" type="text" label="Email"/>
            <Field name="password" component={renderTextField} className="" type="password" label="Password"/>
            <Button variant="raised" type="submit" color="primary"  className="button-submit">
              Sign In
            </Button>
            <Link to={PASSWORD_FORGET}>forgot password{'?'}</Link>
          </form>
        </div>
      </div>
    );
  }


export default connect(null, { signInUser }) (reduxForm({
  form: 'signin',
  validate
})(SignIn));
