import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import configureStore from './store/store'
import App from './components/App';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
