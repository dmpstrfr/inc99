import axios from 'axios';

export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const GET_SINGLE_GROUP = 'GET_SINGLE_GROUP';

export const getAllGroups = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`groups/all/${userId}`);
    dispatch({
      type: GET_ALL_GROUPS,
      payload: response?.data,
    });
  };
};

export const getSingleGroup = (groupId) => {
  return async (dispatch) => {
    const response = await axios.get(`groups/${groupId}`);
    console.log(response);
    dispatch({
      type: GET_SINGLE_GROUP,
      payload: response?.data,
    });
  };
};
