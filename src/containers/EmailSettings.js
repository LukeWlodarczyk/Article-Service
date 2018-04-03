import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { renderTextField } from '../helpers/reduxFormField';
import { withStyles } from 'material-ui/styles';
import { compose } from '../helpers/compose';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.email) {
    errors.newEmail = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.newEmail = 'Invalid email address'
  }

  return errors;
};

const styles = theme => ({
    button: {
      marginTop: '2em',
      width: '80%',
      maxWidth: '600px',
    },
    field: {
      maxWidth: '600px',
      width: '80%',
    }

});


class EmailSettings extends Component {

  handleChangeEmail = (values) => {
    this.props.secureSensitiveAction(values.password, 'emailUpdate', values.newEmail);
  };

  render() {
    const { handleSubmit, classes } = this.props;
    return(
      <div className="container">
        <div className="">
          <h2 className="form-heading">Change Email</h2>
          <form onSubmit={handleSubmit(this.handleChangeEmail)} className='form form-changeEmail'>
            <Field name="newEmail" component={renderTextField} className={classes.field} type="email" label="New email"/>
            <Field name="password" component={renderTextField} className={classes.field} type="password" label="Password"/>
            <Button variant="raised" type="submit" color="primary" className={classes.button} >
              Change email
            </Button>
          </form>
        </div>
      </div>
    );
  }
}


export default compose(
  withStyles(styles, { withTheme: true }),
  reduxForm({
    form: 'emailSettings',
    validate
  })
)(EmailSettings);
