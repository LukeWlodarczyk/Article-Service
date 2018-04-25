import { DISPLAY_ARTICLES } from '../constants/action-types';

export default (state=[], action) => {

  switch(action.type){
      case DISPLAY_ARTICLES:
          return action.payload
      default:
           return state;

  }
}
