import * as Actions from '../actions/userActions';

const initialState = {
  currentUser: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser'))
    : {},
  allStandardUsers: [],
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.SET_CURRENT_USER:
      return (state = {
        ...state,
        currentUser: payload,
      });
    case Actions.GET_ALL_STANDARD_USERS:
      return (state = {
        ...state,
        allStandardUsers: payload,
      });
    default:
      return state;
  }
};
