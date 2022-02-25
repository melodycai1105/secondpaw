import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_POST:
      return { ...posts, post: action.payload };
    case CREATE:
      return { ...posts, posts: action.payload };
    case UPDATE:
      return posts.map((post) => post._id === action.payload._id ? action.payload : post); // return changed array
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
}