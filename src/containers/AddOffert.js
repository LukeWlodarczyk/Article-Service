import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.ofertDescription) {
    errors.ofertDescription = "Ofert description is required";
  }

  return errors;
};


class AddOffert extends Component {

  addOfert = (values) => {

  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Add ofert</h2>
          <form onSubmit={handleSubmit(this.addOfert)}>
            <Field name="email" component={renderTextField} className="" type="text" label="Email"/>
            <Field multiline rows="6" name="ofertDescription" component={renderTextField} className="" type="text" label="Ofert description"/>
            <Button variant="raised" type="submit" color="primary"  className="button-submit">
              Add
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(null, { }),
  reduxForm({
    form: 'addOffert',
    validate
  })
)(AddOffert);
