import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { userReducer } from './userReducer';
import { inventoryReducer } from './inventoryReducer';
import { itemReducer } from './itemReducer';
import { groupReducer } from './groupReducer';
import { tripReducer } from './tripReducer';

const allReducers = combineReducers({
  categoryReducer,
  userReducer,
  inventoryReducer,
  itemReducer,
  groupReducer,
  tripReducer,
});

export default allReducers;
