import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import { renderTextField } from '../helpers/reduxFormField';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};


class DeleteAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteAccount = (values) => {
    this.props.secureSensitiveAction(values.password, 'deleteAccount');
  }

  render() {

    return (
      <div>
        <RaisedButton label="Delete Account" onClick={this.handleOpen} />
        <Dialog
          title="Type in your password"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.props.handleSubmit(this.deleteAccount)}>
            <Field name="password" component={renderTextField} className="" type="password" label="Password"/>
            <FlatButton
              type='submit'
              label="Delete"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
          </form>
        </Dialog>
      </div>
    );
  }
}

export default reduxForm({
  form: 'confirmAccountDelete',
  validate
})(DeleteAccount)
