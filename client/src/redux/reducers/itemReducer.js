import * as Actions from '../actions/itemActions';

const initialState = {
  items: [],
};

export const itemReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.GET_ITEMS_BY_CATEGORY:
      return (state = {
        ...state,
        items: payload,
      });
    case Actions.GET_ALL_ITEMS:
      return (state = {
        ...state,
        items: payload,
      });
    default:
      return state;
  }
};
