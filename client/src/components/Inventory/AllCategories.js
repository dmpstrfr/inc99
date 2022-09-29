import ModalAddCategory from 'modals/ModalAddCategory';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { getSelectedCategory } from 'redux/actions/categoryActions';

const AllCategories = () => {
  const dispatch = useDispatch();

  const [modalAddCategory, setModalAddCategory] = useState(false);

  const { allCategories, selectedCategory } = useSelector(
    (state) => state.categoryReducer
  );
  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );

  return (
    <div
      className='row'
      style={{ display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      <ModalAddCategory
        isOpen={modalAddCategory}
        setIsOpen={setModalAddCategory}
      />
      <div
        className='col-lg-3 col-md-4 col-6'
        style={{ display: 'inline-block' }}
      >
        <Card
          className='card-hover'
          onClick={() => dispatch(getSelectedCategory(0))}
          style={
            selectedCategory === 0
              ? { backgroundColor: '#51bcda', color: '#ffffff' }
              : null
          }
        >
          <CardBody className='single-category'>All</CardBody>
        </Card>
      </div>
      {allCategories
        ?.filter((category) =>
          inventory?.nodedCategories?.includes(category?._id)
        )
        ?.map((category) => {
          return (
            <div
              className='col-lg-3 col-md-4 col-6'
              style={{ display: 'inline-block' }}
            >
              <Card
                className='card-hover'
                onClick={() => dispatch(getSelectedCategory(category))}
                style={
                  selectedCategory?._id === category?._id
                    ? { backgroundColor: '#51bcda', color: '#ffffff' }
                    : null
                }
              >
                <CardBody className='single-category'>
                  {category?.name}
                </CardBody>
              </Card>
            </div>
          );
        })}
      <div
        className='col-lg-3 col-md-4 col-6'
        style={{ display: 'inline-block' }}
      >
        <Card
          className='card-hover'
          onClick={() => setModalAddCategory(true)}
          style={{
            backgroundColor: '#2c2c2c',
            color: '#fff',
          }}
        >
          <CardBody className='single-category'>Add Category</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AllCategories;
