import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';
import { createArticle } from '../actions/index'

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is required.";
  }

  if (!values.body) {
    errors.body = "Ofert description is required";
  }

  return errors;
};


class AddArticle extends Component {

  addArticle = (values) => {
    this.props.createArticle(values)
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Add article</h2>
          <form onSubmit={handleSubmit(this.addArticle)}>
            <Field name="title" component={renderTextField} className="" type="text" label="Title"/>
            <Field multiline rows="6" name="body" component={renderTextField} className="" type="text" label="Article body"/>
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
  connect(null, { createArticle }),
  reduxForm({
    form: 'addArticle',
    validate
  })
)(AddArticle);
