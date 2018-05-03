import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';
import { editUserInfo } from '../actions/index';
import FileField from '../components/FileField';

const validate = (values) => {
  const errors = {};

  if (!/^\d+$/.test(values.age)) {
    errors.age = "Age must be a digit.";
  }

  return errors;
};


class AccountInfoEdit extends Component {

  editProfileInfo = (values) => {
    this.props.editUserInfo(this.props.match.params.id, values)
  };

  submitForm = (values) => {
    console.log(values);
  };

  render() {
    const { handleSubmit, photoUrl } = this.props;
    return(
      <div className="container">
        <div className="">
          <form onSubmit={this.props.handleSubmit(this.submitForm)}>
            <Field photoUrl={photoUrl} type="picture" name="picture" label="Picture" component={FileField} />
            <button className="btn btn-primary" type="submit">Update</button>
          </form>
          <h2 className="">Edit Info</h2>
          <form onSubmit={handleSubmit(this.editProfileInfo)}>
            <Field name="name" component={renderTextField} className="" type="text" label="Name"/>
            <Field name="surname" component={renderTextField} className="" type="text" label="Surname"/>
            <Field name="age" component={renderTextField} className="" type="number" label="Age"/>
            <Field multiline rows="6" name="about" component={renderTextField} className="" type="text" label="About"/>
            <Button variant="raised" type="submit" color="primary"  className="button-submit">
              Edit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    photoUrl: state.user.photoUrl,
    initialValues: {
      name: state.user.name,
      surname: state.user.surname,
      age: state.user.age,
      about: state.user.about,
    }
  }
}

export default compose(
  connect(mapStateToProps, { editUserInfo }),
  reduxForm({
    form: 'editUserInfo',
    validate
  })
)(AccountInfoEdit);