import * as Actions from '../actions/tripsActions';

const initialState = {
  tripsOfGroup: [],
  singleTrip: {},
};

export const tripReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.GET_ALL_TRIPS_OF_GROUP:
      return (state = {
        ...state,
        tripsOfGroup: payload,
      });
    case Actions.GET_SINGLE_TRIP:
      return (state = {
        ...state,
        singleTrip: payload,
      });
    default:
      return state;
  }
};
