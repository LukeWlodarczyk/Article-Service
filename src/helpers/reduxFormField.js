import React from 'react';
import TextField from 'material-ui/TextField';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    error={touched && error}
    helperText={touched && error}
    label={label}
    placeholder={label.toLowerCase()}
    {...input}
    {...custom}
  />
)
