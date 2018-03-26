import { createStore, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";
// import { verifyAuth } from '../actions/index';

export const history = createHistory();

export default (initialState) => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, routerMiddleware(history))
    )
  );

  // store.dispatch(verifyAuth());

  return store;
}
