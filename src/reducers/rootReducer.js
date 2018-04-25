import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as toastr } from 'react-redux-toastr'
import auth from './auth'
import articles from './articles'

const rootReducer = combineReducers({
  auth,
  articles,
  form,
  routerReducer,
  toastr
});

export default rootReducer;
