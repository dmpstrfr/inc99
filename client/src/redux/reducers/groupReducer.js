import * as Actions from '../actions/groupActions';

const initialState = {
  allGroups: [],
  singleGroup: {},
};

export const groupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.GET_ALL_GROUPS:
      return (state = {
        ...state,
        allGroups: payload,
      });
    case Actions.GET_SINGLE_GROUP:
      return (state = {
        ...state,
        singleGroup: payload,
      });
    default:
      return state;
  }
};
