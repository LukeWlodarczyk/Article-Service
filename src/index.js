import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/store'
import App from './containers/App';

const store = createStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
