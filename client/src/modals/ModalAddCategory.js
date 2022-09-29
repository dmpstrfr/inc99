import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import CustomEmojiPicker from 'components/CustomEmojiPicker';
import CustomInput from 'components/CustomInput';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllCategories } from 'redux/actions/categoryActions';
import { getSingleInventory } from 'redux/actions/inventoryActions';
import { getAllItems } from 'redux/actions/itemActions';
import { getItemsByCategory } from 'redux/actions/itemActions';

const ModalAddCategory = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );

  const createCategory = async () => {
    if (name !== '') {
      const toastId = toast.loading('Creating category...');
      const { data } = await axios.post('categories/add', {
        name,
        user: currentUser?.userId,
      });
      await axios.patch('inventories/node/category', {
        inventory: inventory?._id,
        category: data?.category?._id,
      });
      toast.success('Category created!', {
        id: toastId,
      });
    }
  };

  const nodeCategory = async () => {
    if (selectedCategory !== '') {
      const toastId = toast.loading('Adding category...');
      await axios.patch('inventories/node/category', {
        inventory: inventory?._id,
        category: selectedCategory,
      });
      toast.success('Category added!', {
        id: toastId,
      });
    }
  };

  //adds an item
  const handleAdd = async () => {
    if (selectedCategory === '0') createCategory();
    else nodeCategory();
    setIsOpen(false);
    dispatch(getSingleInventory(inventory?._id));
    setName('');
    setIsOpen(false);
  };

  //renders all category options
  const categoryOptions = () => {
    let options = [];
    options.push(
      <option value='' selected disabled>
        Select a category
      </option>
    );
    allCategories
      ?.filter(
        (category) => !inventory?.nodedCategories?.includes(category?._id)
      )
      ?.map((category) => {
        options.push(<option value={category?._id}>{category?.name}</option>);
      });
    options.push(<option value='0'>Other</option>);
    return options;
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} centered>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Create or add category!
        </ModalHeader>
        <ModalBody>
          <CustomInput
            label='Category'
            name='category'
            type='select'
            options={categoryOptions()}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          {selectedCategory === '0' && (
            <CustomInput
              label='Name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleAdd}>
            {selectedCategory === '0' ? <>Create</> : <>Add</>}
          </Button>
          <Button color='secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalAddCategory;
