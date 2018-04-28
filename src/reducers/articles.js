import { DISPLAY_ARTICLES, DISPLAY_ARTICLE } from '../constants/action-types';

export default (state=null, action) => {

  switch(action.type){
      case DISPLAY_ARTICLES:
          return action.payload
      default:
           return state;

  }
}
