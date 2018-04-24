import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is required.";
  }

  if (!values.articleBody) {
    errors.articleBody = "Ofert description is required";
  }

  return errors;
};


class EditArticle extends Component {

  editArticle = (values) => {

  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Edit article</h2>
          <form onSubmit={handleSubmit(this.editArticle)}>
            <Field name="title" component={renderTextField} className="" type="text" label="Title"/>
            <Field multiline rows="6" name="articleBody" component={renderTextField} className="" type="text" label="Article body"/>
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
    form: 'editArticle',
    validate
  })
)(EditArticle);
