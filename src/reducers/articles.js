import { DISPLAY_ARTICLES, DISPLAY_COMMENTS } from '../constants/action-types';

const initialState = {
  articles: null,
  comments: null
}

export default (state=initialState, action) => {

  switch(action.type){
      case DISPLAY_ARTICLES:
          return {
            ...state,
            articles: action.payload
          }
      case DISPLAY_COMMENTS:
          return {
            ...state,
            comments: action.payload
          }
      default:
          return state;

  }
}
