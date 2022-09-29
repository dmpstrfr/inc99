import axios from 'axios';

export const GET_ITEMS_BY_CATEGORY = 'GET_ITEMS_BY_CATEGORY';
export const GET_ALL_ITEMS = 'GET_ALL_ITEMS';

export const getItemsByCategory = (categoryId, userId) => {
  return async (dispatch) => {
    const response = await axios.get(`items/${categoryId}/${userId}`);
    dispatch({
      type: GET_ITEMS_BY_CATEGORY,
      payload: response?.data,
    });
  };
};

export const getAllItems = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`items/all/${userId}`);
    dispatch({
      type: GET_ALL_ITEMS,
      payload: response?.data,
    });
  };
};
