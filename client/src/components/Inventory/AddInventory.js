import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  CardSubtitle,
} from 'reactstrap';
import Select from 'react-select';
import CustomInput from 'components/CustomInput';
import CustomBtn from 'components/CustomBtn';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInventories } from 'redux/actions/inventoryActions';
import { getAllCategories } from 'redux/actions/categoryActions';

const AddInventory = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const { allCategories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getAllCategories(currentUser?.userId));
  }, []);

  const addInventory = async () => {
    const toastId = toast.loading('Creating inventory...');
    let temp = selectedCategories?.map((cat) => cat?.value);
    await axios.post('inventories/add', {
      name: name,
      user: currentUser?.userId,
      categories: temp,
    });
    setName('');
    dispatch(getAllInventories(currentUser?.userId));
    toast.success('Inventory created!', {
      id: toastId,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Create new Inventory
        </CardTitle>
        <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
          To start off, you just need to name your inventory and select
          categories!
        </CardSubtitle>
      </CardHeader>
      <CardBody>
        <CustomInput
          label='Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label for='exampleEmail'>Categories</Label>
        <Select
          isMulti
          value={selectedCategories}
          name='colors'
          options={allCategories?.map((category) => {
            return {
              label: category?.name,
              value: category?._id,
            };
          })}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={(e) => setSelectedCategories(e)}
          closeMenuOnSelect={false}
        />
        <div className='d-flex justify-content-end'>
          <CustomBtn
            style={{
              width: '25%',
              marginTop: '20px',
            }}
            text='Add'
            disabled={name === ''}
            onClick={addInventory}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default AddInventory;
