import axios from 'axios';
import CustomInput from 'components/CustomInput';
import AddItems from 'components/Inventory/AddItems';
import AllCategories from 'components/Inventory/AllCategories';
import UserItems from 'components/Inventory/UserItems';
import SearchInput from 'components/SearchInput';
import SingleInventory from 'components/ShowTell/SingleInventory';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPublicInventories } from 'redux/actions/inventoryActions';
import { getAllStandardUsers } from 'redux/actions/userActions';

const ShowTell = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const allStandardUsers = useSelector(
    (state) => state.userReducer.allStandardUsers
  );
  const publicInventories = useSelector(
    (state) => state.inventoryReducer.publicInventories
  );

  useEffect(() => {
    dispatch(getAllPublicInventories());
    dispatch(getAllStandardUsers());
  }, []);

  const searchFilter = (inventories) => {
    if (selectedUser == 0 && searchValue === '') return inventories;
    else if (selectedUser != 0 && searchValue === '') {
      return inventories?.filter((inventory) => {
        if (inventory?.owner?._id === selectedUser) return inventory;
      });
    } else if (selectedUser == 0 && searchValue !== '') {
      return inventories?.filter((inventory) => {
        if (
          inventory?.name?.toUpperCase().includes(searchValue?.toUpperCase()) ||
          inventory?.owner?.name
            ?.toUpperCase()
            .includes(searchValue?.toUpperCase())
        )
          return inventory;
      });
    } else if (selectedUser != 0 && searchValue === '') {
      return inventories?.filter((inventory) => {
        if (
          inventory?.name?.toUpperCase().includes(searchValue?.toUpperCase()) ||
          inventory?.owner?.name
            ?.toUpperCase()
            .includes(searchValue?.toUpperCase()) ||
          inventory?.owner?._id === selectedUser
        )
          return inventory;
      });
    }
  };

  //renders all users options
  const userOptions = () => {
    let options = [];
    options.push(
      <option value='' selected disabled>
        Select a user
      </option>
    );
    options.push(
      <option value={0} selected>
        All users
      </option>
    );
    allStandardUsers?.map((user) => {
      options.push(<option value={user?.userId}>{user?.name}</option>);
    });
    return options;
  };

  return (
    <div className='content'>
      <h2 className='mb-1'>Show & Tell</h2>
      <p className='card-category mb-4'>
        View other users' public inventories, and show case yours!
      </p>
      <div className='row d-flex justify-content-center'>
        <div className='col-sm-6'>
          <SearchInput
            placeholder='Search by user or inventory'
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className='col-sm-4'>
          <CustomInput
            type='select'
            options={userOptions()}
            onChange={(e) => setSelectedUser(e.target.value)}
          />
        </div>
      </div>
      <div className='row mt-2'>
        {searchFilter(publicInventories)?.map((inventory) => (
          <SingleInventory inventory={inventory} />
        ))}
      </div>
    </div>
  );
};

export default ShowTell;
