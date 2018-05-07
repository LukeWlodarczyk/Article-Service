import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../helpers/reduxFormField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      password: ''
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.reset()
  };

  handleChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };


  delete = () => {
    this.props.delete(this.state.password, this.props.parameter);
    this.handleClose()
    this.setState({
      password: ''
    });
  }

  render() {
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.handleClickOpen}>
          {this.props.buttonText}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.dialogContentText}
            </DialogContentText>
            <form onSubmit={this.props.handleSubmit(this.delete)}>
              <Field
                name="password"
                component={renderTextField}
                className=""
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
                margin="dense"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              disabled={this.state.password === ''}
              onClick={this.delete}
              color="primary"
            >
              {this.props.buttonText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default reduxForm({
  form: 'confirmDelete',
  validate
})(DeleteModal)
