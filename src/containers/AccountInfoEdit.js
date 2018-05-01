import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';
import { createArticle } from '../actions/index'

const validate = (values) => {
  const errors = {};

  if (/^\d+$/.test(values.age)) {
    errors.title = "Age must be a digit.";
  }

  return errors;
};


class AccountInfoEdit extends Component {

  editProfileInfo = (values) => {
    this.props.editUserInfo(values)
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Add article</h2>
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
    initialValues: {
      name: state.user.name,
      surname: state.user.surname,
      age: state.user.age,
      about: state.user.about
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
