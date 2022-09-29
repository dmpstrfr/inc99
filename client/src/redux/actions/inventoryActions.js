import axios from 'axios';

export const GET_ALL_INVENTORIES = 'GET_ALL_INVENTORIES';
export const GET_SINGLE_INVENTORY = 'GET_SINGLE_INVENTORY';
export const GET_ALL_PUBLIC_INVENTORIES = 'GET_ALL_PUBLIC_INVENTORIES';
export const GET_JOINT_INVENTORY = 'GET_JOINT_INVENTORY';
export const GET_TRIP_INVENTORY = 'GET_TRIP_INVENTORY';

export const getAllInventories = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`inventories/all/${userId}`);
    dispatch({
      type: GET_ALL_INVENTORIES,
      payload: data,
    });
  };
};

export const getSingleInventory = (inventoryId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`inventories/${inventoryId}`);
    dispatch({
      type: GET_SINGLE_INVENTORY,
      payload: data,
    });
  };
};

export const getAllPublicInventories = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`inventories/all/public`);
    dispatch({
      type: GET_ALL_PUBLIC_INVENTORIES,
      payload: data,
    });
  };
};

export const getJointInventory = (groupId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`inventories/joint-inventory/${groupId}`);
    console.log(data);
    dispatch({
      type: GET_JOINT_INVENTORY,
      payload: data,
    });
  };
};

export const getTripInventory = (tripId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`inventories/trip-inventory/${tripId}`);
    dispatch({
      type: GET_TRIP_INVENTORY,
      payload: data,
    });
  };
};
