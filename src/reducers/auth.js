import {AUTH_USER, SIGN_OUT_USER, AUTH_ERROR} from '../constants/action-types';

const initialState={
    authenticated: null,
    error: null
};

export default (state=initialState, action) => {

  switch(action.type){
      case AUTH_USER:
          return {
              ...state,
              authenticated: action.payload,
              error: null
          };
      case SIGN_OUT_USER:
          return {
              ...state,
              authenticated: null,
              error: null
          };
      case AUTH_ERROR:
          return {
              ...state,
              error: action.payload.message
          };
      default:
           return state;

  }
}
