import { FETCH_USER, END_LOADING, START_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true }, action) => {
    switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    case END_LOADING:
      return { ...state, isLoading: false };
    case START_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}