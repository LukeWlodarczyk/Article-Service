import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import auth from './auth.js'

const rootReducer = combineReducers({
  auth,
  form
});

export default rootReducer;
