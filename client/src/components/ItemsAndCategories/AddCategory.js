import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import CustomBtn from '../CustomBtn';
import CustomInput from '../CustomInput';

const AddCategory = ({ setAllCategories }) => {
  const [name, setName] = useState('');

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const handleAdd = async () => {
    if (name !== '') {
      const toastId = toast.loading('Adding category...');
      await axios.post('categories/add', { name, user: null });
      const response = await axios.get(`categories/all/${currentUser?.userId}`);
      setAllCategories(response?.data);
      toast.success('Category added!', {
        id: toastId,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Add category
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CustomInput
          label='Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className='d-flex justify-content-end'>
          <CustomBtn
            style={{
              width: '25%',
              marginTop: '20px',
            }}
            text='Add'
            onClick={handleAdd}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default AddCategory;
