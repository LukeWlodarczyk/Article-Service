import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../actions/index'

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

  if (values.password.length<7) {
    errors.password = "Please should contain at least 6 characters";
  }

  return errors;
};

class SignIn extends React.Component {

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="">{label}</label>
      <div>
        <input {...input} placeholder={label} className="" type={type} />
        {touched && error && <div className="">{error}</div>}
      </div>
    </fieldset>
  );


  render() {
    const { authError } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Log In</h2>

          { authError && <div className="">{ this.props.authenticationError }</div> }

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" component={this.renderField} className="" type="text" label="Email"/>
            <Field name="password" component={this.renderField} className="" type="password" label="Password"/>

            <button action="submit" className="">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  }
}

export default connect(mapStateToProps, { signInUser })(reduxForm({
  form: 'login',
  validate
})(Login));
