import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error)
    if (error == "Error: Request failed with status code 404") 
      alert("User with this email address does not exist") 
    else if (error == "Error: Request failed with status code 409")
      alert("Incorrect password")
    else 
      alert(error.message)
    }

};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error)
    if (error == "Error: Request failed with status code 400") 
      alert("The two password fields don't match") 
    else if (error == "Error: Request failed with status code 409")
      alert("User with this email address already exists")
    else 
      alert(error.message)
    }
};