import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_BY_SEARCH:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); // return changed array
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
}