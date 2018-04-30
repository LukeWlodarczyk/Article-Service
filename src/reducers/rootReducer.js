import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as toastr } from 'react-redux-toastr';
import auth from './auth';
import articles from './articles';
import user from './user';

const rootReducer = combineReducers({
  auth,
  articles,
  user,
  form,
  routerReducer,
  toastr
});

export default rootReducer;
