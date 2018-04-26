import { DISPLAY_ARTICLES, DISPLAY_ARTICLE } from '../constants/action-types';

const initialState = {
  articles: [],
  article: {}
}

export default (state=initialState, action) => {

  switch(action.type){
      case DISPLAY_ARTICLES:
          return {
            ...state,
            articles: action.payload,
          }
      case DISPLAY_ARTICLE:
          return {
            ...state,
            article: action.payload
          }
      default:
           return state;

  }
}
