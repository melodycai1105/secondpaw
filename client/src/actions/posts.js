import * as api from '../api';
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_USER, PURCHASE } from '../constants/actionTypes';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH_USER, payload: { user: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    //console.log(error.message);
  }
}

export const updateRating = (id, rating) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateRating(id, rating);
    dispatch({ type: UPDATE, payload: { user: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  //console.log(error.message);
  }
}

export const getPosts = (page, sortType) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page, sortType);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const getPostsByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsByUser(userId);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const getReservationByUser = (userId) => async (dispatch) => {
  try{
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchReservationByUser(userId);
      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
  } catch(error) {
      console.log(error.message);
  }
}

export const makePurchase = (userId, postId) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.purchase(userId, postId);
        dispatch({ type: PURCHASE, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}


export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    navigate(`/posts/`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id, userId) => async (dispatch) => {
  try {
    await api.deletePost(id, userId);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
}