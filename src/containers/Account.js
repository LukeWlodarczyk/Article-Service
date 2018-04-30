import React, { Component } from 'react';
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { displayUserInfo } from '../actions/index';

class Account extends Component {

  componentDidMount() {
    const { emailVerified, uid } = this.props.authenticated;
    if(!emailVerified && uid !== 'guest') {
      toastr.info('Please verify your email')
    };
    this.props.displayUserInfo(this.props.match.params.id);
  }

  render() {
    const { userInfo } = this.props;
    let user = {
      name: '',
      surname: '',
      email: '',
      age: '',
      photoUrl: 'http://simpleicon.com/wp-content/uploads/user1.png',
      about: ''
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
        <p>Account</p>
        <p>Email: {user.email}</p>
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
 
export default connect(mapStateToProps, { displayUserInfo })(Account)
