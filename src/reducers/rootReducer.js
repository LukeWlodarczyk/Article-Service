import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import {routerReducer} from 'react-router-redux';
import auth from './auth.js'

const rootReducer = combineReducers({
  auth,
  form,
  routerReducer
});

export default rootReducer;
