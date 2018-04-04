import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/index';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';


const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors;
};


class PasswordForgetForm extends Component {

  handleResetPassword = ({ email }) => {
    this.props.resetPassword(email);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.handleResetPassword)}>
          <Field name="email" component={renderTextField} label="Email" type="email" />
          <Button variant="raised" type="submit" color="primary" className="button-submit" >
            Reset password
          </Button>
        </form>
      </div>
    );
  };
};

export default compose(
  connect(null, { resetPassword }),
  reduxForm({
    form: 'resetPassword',
    validate
  })
)(PasswordForgetForm);
