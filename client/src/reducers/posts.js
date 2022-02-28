import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING: 
      return { ...state, isLoading: true };
    case END_LOADING: 
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }; // return changed array
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
}