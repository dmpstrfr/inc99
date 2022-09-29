import axios from 'axios';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_SELECTED_CATEGORY = 'GET_SELECTED_CATEGORY';

export const getAllCategories = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`categories/all/${userId}`);
    console.log(response);
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: response?.data,
    });
  };
};

export const getSelectedCategory = (selectedCategory) => {
  return (dispatch) => {
    dispatch({
      type: GET_SELECTED_CATEGORY,
      payload: selectedCategory,
    });
  };
};
