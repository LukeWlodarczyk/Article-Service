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

  return errors;
};

class SignIn extends React.Component {

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );


  render() {
    const { authError, handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Log In</h2>

          { authError && <div className="">{ authError }</div> }

          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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
})(SignIn));
