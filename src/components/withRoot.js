import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import CssBaseline from 'material-ui/CssBaseline';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

const withRoot = (Component) => {
  const WithRoot = (props) => (
    <MuiThemeProvider theme={theme}>
      <Component {...props} />
    </MuiThemeProvider>
  )

  return WithRoot;
}

export default withRoot;
