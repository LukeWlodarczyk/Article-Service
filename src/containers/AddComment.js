import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';
import { addComment } from '../actions/index';

const validate = (values) => {
  const errors = {};

  if (!values.comment) {
    errors.comment = "Title is required.";
  }

  return errors;
};


class AddComment extends Component {

  addComment = ({ comment }) => {
    this.props.addComment(this.props.articleId, comment);
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Add Comment</h2>
          <form onSubmit={handleSubmit(this.addComment)}>
            <Field multiline rows="6" name="comment" component={renderTextField} className="" type="text" label="Comment"/>
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
  reduxForm({
    form: 'addComment',
    validate
  })
)(AddComment);
