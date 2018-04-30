import { DISPLAY_USER_INFO } from '../constants/action-types';

export default (state=null, action) => {

  switch(action.type){
      case DISPLAY_USER_INFO:
          return action.payload
      default:
          return state;

  }
}
