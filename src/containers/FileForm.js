import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../helpers/reduxFormField';
import Button from 'material-ui/Button';
import FileField from '../components/FileField';
import { toastr } from 'react-redux-toastr';

class FileForm extends Component {
  updatePhoto = (values) => {
    if(!values.picture) {
      return toastr.error("Please attach an image!")
    }
    if(values.picture[0].size > 100000) {
      return toastr.error("Image size should be less than 100kb!")
    }
    if(!values.picture[0].type.includes('image')) {
      return toastr.error("You have uploaded an invalid image file type!")
    }
    this.props.updateUserPhoto(this.props.userId, values.picture[0])
  };

  render() {
    const { handleSubmit, photoUrl } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit(this.updatePhoto)}>
        <Field photoUrl={photoUrl} type="picture" name="picture" label="Picture" component={FileField} />
        <Button variant="raised" type="submit" color="primary"  className="button-submit">
          Update
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editFileForm',
})(FileForm);
