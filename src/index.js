import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import configureStore from './store/store'
import App from './components/App';

const store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)} >
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
