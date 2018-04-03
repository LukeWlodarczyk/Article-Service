import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { renderTextField } from '../helpers/reduxFormField';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors;
};


class EmailSettings extends Component {

  handleChangeEmail = (values) => {
    this.props.secureSensitiveAction(values.password, 'emailUpdate', values.newEmail);
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Change Email</h2>
          <form onSubmit={handleSubmit(this.handleChangeEmail)}>
            <Field name="newEmail" component={renderTextField} className="" type="email" label="New email"/>
            <Field name="password" component={renderTextField} className="" type="password" label="password"/>
            <Button variant="raised" type="submit" color="primary" className="button-submit" >
              Change email
            </Button>
          </form>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'emailSettings',
  validate
})(EmailSettings);
