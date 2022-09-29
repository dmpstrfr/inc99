import * as Actions from '../actions/categoryActions';

const initialState = {
  allCategories: [],
  selectedCategory: 0,
};

export const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.GET_ALL_CATEGORIES:
      return (state = {
        ...state,
        allCategories: payload,
      });
    case Actions.GET_SELECTED_CATEGORY:
      return (state = {
        ...state,
        selectedCategory: payload,
      });
    default:
      return state;
  }
};
