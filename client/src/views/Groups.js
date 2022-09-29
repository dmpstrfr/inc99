import axios from 'axios';
import AddedGroups from 'components/Groups/AddedGroups';
import AddGroup from 'components/Groups/AddGroup';
import AllGroups from 'components/Groups/AllGroups';
import UserGroups from 'components/Groups/UserGroups';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from 'redux/actions/groupActions';
import { getAllStandardUsers } from 'redux/actions/userActions';

const Groups = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    dispatch(getAllStandardUsers());
    dispatch(getAllGroups(currentUser?.userId));
  }, []);

  return (
    <div className='content'>
      <h2 className='mb-1'>Groups</h2>
      <p className='card-category mb-4'>
        Please select a group to open details.
      </p>
      <div className='row mt-3'>
        <div className='col-md-6 group-container'>
          <UserGroups />
        </div>
        <div className='col-md-6'>
          <AddedGroups />
        </div>
      </div>
    </div>
  );
};

export default Groups;
