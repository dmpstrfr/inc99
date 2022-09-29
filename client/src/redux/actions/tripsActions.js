import axios from 'axios';

export const GET_ALL_TRIPS_OF_GROUP = 'GET_ALL_TRIPS_OF_GROUP';
export const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP';

export const getAllTripsOfGroup = (groupId) => {
  return async (dispatch) => {
    const response = await axios.get(`trips/${groupId}`);
    dispatch({
      type: GET_ALL_TRIPS_OF_GROUP,
      payload: response?.data,
    });
  };
};

export const getSingleTrip = (tripId) => {
  return async (dispatch) => {
    const response = await axios.get(`trips/single/${tripId}`);
    dispatch({
      type: GET_SINGLE_TRIP,
      payload: response?.data,
    });
  };
};
