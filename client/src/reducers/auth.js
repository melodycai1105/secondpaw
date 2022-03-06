import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      const { profile_pic } = action?.data;
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));      

      return { ...state, profile_pic,  authData: action?.data };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
