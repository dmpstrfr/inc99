import axios from 'axios';
import AddCategory from 'components/ItemsAndCategories/AddCategory';
import AddItem from 'components/ItemsAndCategories/AddItem';
import AllCategories from 'components/ItemsAndCategories/AllCategories';
import AllItems from 'components/ItemsAndCategories/AllItems';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ItemsAndCategories() {
  const [allCategories, setAllCategories] = useState();
  const [allItems, setAllItems] = useState();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(`categories/all/${currentUser?.userId}`);
      setAllCategories(response?.data);
    };
    const getItems = async () => {
      const response = await axios.get(`items/all/${currentUser?.userId}`);
      setAllItems(response?.data);
    };
    getCategories();
    getItems();
  }, []);

  return (
    <>
      <div className='content'>
        <h2>Categories</h2>
        <div className='row'>
          <div className='col-md-6'>
            <AddCategory setAllCategories={setAllCategories} />
          </div>
          <div
            className='col-md-6'
            style={{ overflowY: 'scroll', height: '241.25px' }}
          >
            <AllCategories
              allCategories={allCategories}
              setAllCategories={setAllCategories}
            />
          </div>
        </div>
        <h2 style={{ marginTop: '25px' }}>Items</h2>
        <div className='row'>
          <div className='col-md-6'>
            <AddItem allCategories={allCategories} setAllItems={setAllItems} />
          </div>
          <div
            className='col-md-6'
            style={{ overflowY: 'scroll', height: '317px' }}
          >
            <AllItems allItems={allItems} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemsAndCategories;
