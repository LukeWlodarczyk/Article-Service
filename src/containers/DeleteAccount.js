// import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';
// import Button from 'material-ui/Button';
// import { renderTextField } from '../helpers/reduxFormField';
// import { Field, reduxForm } from 'redux-form';
//
// const validate = values => {
//   const errors = {};
//
//   if (!values.password) {
//     errors.password = "Please enter a password.";
//   }
//
//   return errors;
// };
//
//
// class DeleteAccount extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       open: false,
//     };
//   }
//
//   handleOpen = () => {
//     this.setState({ open: true });
//   };
//
//   handleClose = () => {
//     this.setState({ open: false });
//   };
//
//   deleteAccount = (values) => {
//     this.props.secureSensitiveAction(values.password, 'deleteAccount');
//   }
//
//   render() {
//
//     return (
//       <div>
//         <Button variant="raised" onClick={this.handleOpen}>Delete Account</Button>
//         <Dialog
//           title="Type in your password"
//           modal={false}
//           open={this.state.open}
//           onRequestClose={this.handleClose}
//         >
//           <form onSubmit={this.props.handleSubmit(this.deleteAccount)}>
//             <Field name="password" component={renderTextField} className="" type="password" label="Password"/>
//             <Button
//               type='submit'
//               keyboardFocused={true}
//               onClick={this.handleClose}
//               color="primary"
//             >
//               Delete
//             </Button>
//
//           </form>
//         </Dialog>
//       </div>
//     );
//   }
// }



import React from 'react';
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

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      password: '',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      password: '',
    });
    this.props.reset()
  };

  handleChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };


  deleteAccount = (values) => {
    this.props.secureSensitiveAction(this.state.password, 'deleteAccount');
  }

  render() {
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.handleClickOpen}>Delete Account</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This operation is permanent. Type in your password if you really want to delete your account.
            </DialogContentText>
            <form onSubmit={this.props.handleSubmit(this.deleteAccount)}>
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
            <Button variant="raised" disabled={this.state.password === ''} onClick={this.deleteAccount} color="primary">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default reduxForm({
  form: 'confirmAccountDelete',
  validate
})(DeleteAccount)
