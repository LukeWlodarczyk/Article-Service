import React, { Component } from 'react';
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { compose } from '../helpers/compose';
import Button from 'material-ui/Button';
import { displayUserInfo } from '../actions/index';

const validate = (values) => {
  const errors = {};

  if (!values.image) {
    errors.image = "Please attach a picture";
  }

  return errors;
}


class Account extends Component {

  componentDidMount() {
    const { emailVerified, uid } = this.props.authenticated;
    if(!emailVerified && uid !== 'guest') {
      toastr.info('Please verify your email')
    };
    this.props.displayUserInfo(this.props.match.params.id);
  }

  renderForm = field => {
      const { input, label, type, meta: { touched, error } } = field;
      const className = `form-group ${touched && error ? "has-error" : ""}`;
      return (
        <fieldset className={className}>
          <label className='label-control'>{label}</label>
          <div>
            <input {...input} type={type}
            className='form-control' />
            {touched &&
              error && <div className="alert alert-danger">{error}</div>}
          </div>
        </fieldset>
      );
    };

  render() {
    const { userInfo, handleSubmit, authenticated } = this.props;
    let user = {
      name: '...',
      surname: '...',
      email: '...',
      age: '...',
      photoUrl: '...',
      about: '...'
    };

    if(userInfo) {
      user = {
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
        age: userInfo.age,
        photoUrl: userInfo.photoUrl,
        about: userInfo.about
      }
    }
    return (
      <div>
        <img src={user.photoUrl} alt=""/>
        <p>Account</p>
        <p>Email: {authenticated.email}</p>
        <p>-------------------</p>
          {
            this.props.authenticated.uid === this.props.match.params.id &&
              <Link className="" to={"/users/"+ this.props.match.params.id +"/edit"}>Edit</Link>
          }
        <p>Name: {user.name}</p>
        <p>Surname: {user.surname}</p>
        <p>Age: {user.age}</p>
        <p>About: {user.about}</p>
        {
          this.props.authenticated.uid === this.props.match.params.id &&
            <Link className="" to={"/users/"+ this.props.match.params.id +"/settings"}>Settings</Link>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.user
  }
}
 
export default compose(
  connect(mapStateToProps, { displayUserInfo }),
  reduxForm({
    form: 'updatePhoto',
    validate
  })
)(Account)
