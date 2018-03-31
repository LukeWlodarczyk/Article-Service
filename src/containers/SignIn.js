import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
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
          <form onSubmit={handleSubmit((values) => signInUser(values))}>
            <Field name="email" component={renderTextField} className="" type="text" label="Email"/>
            <Field name="password" component={renderTextField} className="" type="password" label="Password"/>
            <RaisedButton type="submit" label="Sign In" className="button-submit" primary={true} />
            <Link to={PASSWORD_FORGET}>forgot password{'?'}</Link>
          </form>
        </div>
      </div>
    );
  }


export default connect(null, { signInUser }) (reduxForm({
  form: 'login',
  validate
})(SignIn));
