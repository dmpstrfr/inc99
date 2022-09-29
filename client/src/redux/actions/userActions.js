import axios from 'axios';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_ALL_STANDARD_USERS = 'GET_ALL_STANDARD_USERS';

export const setCurrentUser = (currentUser) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: currentUser,
    });
  };
};

export const getAllStandardUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(`users/standard`);
    dispatch({
      type: GET_ALL_STANDARD_USERS,
      payload: response?.data,
    });
  };
};
