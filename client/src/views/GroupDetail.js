import axios from 'axios';
import AddItems from 'components/Inventory/AddItems';
import AllCategories from 'components/Inventory/AllCategories';
import UserItems from 'components/Inventory/UserItems';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import LinkedGroups from 'components/Inventory/LinkedGroups';
import { getSingleGroup } from 'redux/actions/groupActions';
import JointInventory from 'components/Groups/JointInventory';
import { getJointInventory } from 'redux/actions/inventoryActions';
import Members from 'components/Groups/Members';
import Trips from 'components/Groups/Trips';
import { getAllTripsOfGroup } from 'redux/actions/tripsActions';

const GroupDetail = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const singleGroup = useSelector((state) => state.groupReducer.singleGroup);

  useEffect(() => {
    dispatch(getSingleGroup(groupId));
    dispatch(getAllTripsOfGroup(groupId));
    dispatch(getJointInventory(groupId));
  }, []);

  return (
    <div className='content'>
      <h2 className='mb-1'>{singleGroup?.name}</h2>
      <p className='card-category mb-4'>
        <span style={{ fontWeight: '700' }}>Created by: </span>
        {singleGroup?.owner?.name}
      </p>
      <div className='row mt-3'>
        <div className='col-md-6'>
          <JointInventory />
        </div>
        <div className='col-md-6'>
          <Members />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-12'>
          <Trips />
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
