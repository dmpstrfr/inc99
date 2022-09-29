import * as Actions from '../actions/inventoryActions';

const initialState = {
  allInventories: [],
  singleInventory: {},
  jointInventory: [],
  tripInventory: [],
  publicInventories: [],
};

export const inventoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.GET_ALL_INVENTORIES:
      return (state = {
        ...state,
        allInventories: payload,
      });
    case Actions.GET_SINGLE_INVENTORY:
      return (state = {
        ...state,
        singleInventory: payload,
      });
    case Actions.GET_ALL_PUBLIC_INVENTORIES:
      return (state = {
        ...state,
        publicInventories: payload,
      });
    case Actions.GET_JOINT_INVENTORY:
      return (state = {
        ...state,
        jointInventory: payload,
      });
    case Actions.GET_TRIP_INVENTORY:
      return (state = {
        ...state,
        tripInventory: payload,
      });
    default:
      return state;
  }
};
