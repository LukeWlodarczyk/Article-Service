import { createStore, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";

export const history = createHistory();


export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, routerMiddleware(history))
  )
);
