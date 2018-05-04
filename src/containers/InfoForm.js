import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../helpers/reduxFormField';
import Button from 'material-ui/Button';

const validate = (values) => {
  const errors = {};

  Object.entries(values).forEach( ([key, value]) => {
    if(!value) errors[key]=`${key[0].toUpperCase()+key.slice(1)} is required.`
  })

  if (!/^\d+$/.test(values.age)) {
    errors.age = "Age must be a digit.";
  }

  return errors;
};

export class InfoForm extends Component {

  editProfileInfo = (values) => {
    this.props.editUserInfo(this.props.userId, values)
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.editProfileInfo)}>
        <h2 className="">Edit Info</h2>
        <Field name="name" component={renderTextField} className="" type="text" label="Name"/>
        <Field name="surname" component={renderTextField} className="" type="text" label="Surname"/>
        <Field name="age" component={renderTextField} className="" type="number" label="Age"/>
        <Field multiline rows="6" name="about" component={renderTextField} className="" type="text" label="About"/>
        <Button variant="raised" type="submit" color="primary"  className="button-submit">
          Edit
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editInfoForm',
  validate
})(InfoForm);
