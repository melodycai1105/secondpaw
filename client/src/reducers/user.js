import { FETCH_USER } from '../constants/actionTypes';

export default (state = { isLoading: true }, action) => {
    switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.user };


    default:
      return state;
  }
}