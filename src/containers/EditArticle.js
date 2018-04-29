import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';
import { editArticle } from '../actions/index';

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

const mapStateToProps = (state, ownProps) => {
  return {
    articles: state.articles.articles,
    userId: state.auth.authenticated.uid,
    initialValues: {
      title: state.articles.articles[ownProps.match.params.id].title,
      body: state.articles.articles[ownProps.match.params.id].body
    }
  }
}


class EditArticle extends Component {

  componentDidMount() {
    if(this.props.articles[this.props.match.params.id].authorId !== this.props.userId) {
      console.log('not allowed');
    }
  }

  editArticle = (values) => {
    console.log(this.props.match.params.id);
    this.props.editArticle(this.props.match.params.id, values);
  };

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="">Edit article</h2>
          <form onSubmit={handleSubmit(this.editArticle)}>
            <Field name="title" component={renderTextField} className="" type="text" label="Title"/>
            <Field multiline rows="6" name="body" component={renderTextField} className="" type="text" label="Article body"/>
            <Button variant="raised" type="submit" color="primary"  className="button-submit">
              Edit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, { editArticle }),
  reduxForm({
    form: 'editArticle',
    validate
  })
)(EditArticle);
