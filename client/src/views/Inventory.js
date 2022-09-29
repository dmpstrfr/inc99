import axios from 'axios';
import AddGroup from 'components/Groups/AddGroup';
import AllGroups from 'components/Groups/AllGroups';
import AddInventory from 'components/Inventory/AddInventory';
import AllInventories from 'components/Inventory/AllInventories';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInventories } from 'redux/actions/inventoryActions';

const Inventory = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    dispatch(getAllInventories(currentUser?.userId));
  }, []);

  return (
    <div className='content'>
      <h2 className='mb-1'>Inventories</h2>
      <p className='card-category mb-4'>
        Please select an inventory to view details.
      </p>
      <div className='row mt-3'>
        <div className='col-md-6 group-container'>
          <AllInventories />
        </div>
        <div className='col-md-6'>
          <AddInventory />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
