import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { renderTextField } from '../helpers/reduxFormField';
import { compose } from '../helpers/compose';
import { editUserInfo, updateUserPhoto } from '../actions/index';
import FileField from '../components/FileField';
import { toastr } from 'react-redux-toastr';
import FileForm from './FileForm';
import InfoForm from './InfoForm';

class AccountInfoEdit extends Component {

  render() {
    const { handleSubmit, photoUrl, name, surname, age, about } = this.props;
    const initialValues = { name, surname, age, about };
    return(
      <div className="container">
        <FileForm
          userId={this.props.match.params.id}
          photoUrl={photoUrl}
          updateUserPhoto={this.props.updateUserPhoto}
        />
        <InfoForm
          userId={this.props.match.params.id}
          initialValues={initialValues}
          editUserInfo={this.props.editUserInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photoUrl: state.user.photoUrl,
    name: state.user.name,
    surname: state.user.surname,
    age: state.user.age,
    about: state.user.about,
  }
}

export default compose(
  connect(mapStateToProps, { editUserInfo, updateUserPhoto }),
)(AccountInfoEdit);
