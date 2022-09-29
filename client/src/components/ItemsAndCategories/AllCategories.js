import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Card, CardBody } from 'reactstrap';

const AllCategories = ({ allCategories, setAllCategories }) => {
  const handleDelete = async (categoryId) => {
    const toastId = toast.loading('Deleting category...');
    await axios.delete(`categories/${categoryId}`);
    const response = await axios.get('categories/all');
    setAllCategories(response?.data?.categories);
    toast.success('Category deleted!', {
      id: toastId,
    });
  };

  return (
    <div className='row'>
      {allCategories?.map((category) => {
        return (
          <div className='col-6'>
            <Card>
              {/* <img
                className='card-icon'
                src={require('assets/img/delete-icon.png')}
                onClick={() => handleDelete(category._id)}
              /> */}
              <CardBody className='single-category'>{category?.name}</CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategories;
