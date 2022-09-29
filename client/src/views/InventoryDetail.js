import axios from 'axios';
import AddItems from 'components/Inventory/AddItems';
import AllCategories from 'components/Inventory/AllCategories';
import UserItems from 'components/Inventory/UserItems';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getAllCategories } from 'redux/actions/categoryActions';
import { getSingleInventory } from 'redux/actions/inventoryActions';
import { getUsersInventory } from 'redux/actions/inventoryActions';
import { getUsersInventoryAll } from 'redux/actions/inventoryActions';
import { getAllItems } from 'redux/actions/itemActions';
import { getItemsByCategory } from 'redux/actions/itemActions';
import Switch from 'react-switch';
import LinkedGroups from 'components/Inventory/LinkedGroups';
import { getAllGroups } from 'redux/actions/groupActions';

const InventoryDetail = () => {
  const { inventoryId } = useParams();
  const dispatch = useDispatch();

  const [inventoryAccess, setInventoryAccess] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const singleInventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );

  useEffect(() => {
    dispatch(getAllCategories(currentUser?.userId));
    dispatch(getSingleInventory(inventoryId));
    dispatch(getAllItems(currentUser?.userId));
    dispatch(getAllGroups(currentUser?.userId));
  }, []);

  useEffect(() => {
    setInventoryAccess(singleInventory?.access);
  }, [singleInventory]);

  const handleAccessChange = (value) => {
    if (inventoryAccess === 'PRIVATE') {
      updateInventoryAccess('PUBLIC');
      setInventoryAccess('PUBLIC');
    } else {
      updateInventoryAccess('PRIVATE');
      setInventoryAccess('PRIVATE');
    }
  };

  const updateInventoryAccess = async (inventoryAccess) => {
    await axios.patch(`/inventories/${singleInventory?._id}`, {
      access: inventoryAccess,
    });
  };

  return (
    <div className='content'>
      <div className='row d-flex justify-content-between'>
        <div className='col-sm-10'>
          <h2 className='mb-1'>{singleInventory?.name}</h2>
        </div>
        <div className='col-sm-2 order-first order-sm-2 d-flex justify-content-end align-items-center'>
          <span className='card-category' style={{ marginRight: '10px' }}>
            {inventoryAccess}
          </span>
          <Switch
            onChange={handleAccessChange}
            checked={inventoryAccess === 'PRIVATE'}
            onColor='#51bcda'
            className='react-switch'
          />
        </div>
      </div>
      <p className='card-category mb-4'>
        Select a category to view your inventory.
      </p>
      <AllCategories />
      <div className='row mt-3'>
        <div className='col-md-6'>
          <UserItems />
        </div>
        <div className='col-md-6'>
          <AddItems
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-12'>
          <LinkedGroups />
        </div>
      </div>
    </div>
  );
};

export default InventoryDetail;
