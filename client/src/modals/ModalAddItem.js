import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import CustomEmojiPicker from 'components/CustomEmojiPicker';
import CustomInput from 'components/CustomInput';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllItems } from 'redux/actions/itemActions';
import { getItemsByCategory } from 'redux/actions/itemActions';

const ModalAddItem = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );

  //adds an item
  const handleAdd = async () => {
    if (name !== '' && emoji && selectedCategory !== '') {
      const toastId = toast.loading('Adding item...');
      await axios.post('items/add', {
        name,
        emoji: emoji?.unified,
        createdBy: currentUser?.userId,
        category: selectedCategory,
      });
      dispatch(getAllItems(currentUser?.userId));
      toast.success('Item added!', {
        id: toastId,
      });
      setName('');
      setEmoji(null);
      setSelectedCategory(allCategories[0]?._id);
      setIsOpen(false);
    }
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
      ?.filter((category) =>
        inventory?.nodedCategories?.includes(category?._id)
      )
      ?.map((category) => {
        options.push(<option value={category?._id}>{category?.name}</option>);
      });
    return options;
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} centered>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Create a personal item!
        </ModalHeader>
        <ModalBody>
          <CustomInput
            label='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='row'>
            <div className='col-5 d-flex justify-content-center align-items-center'>
              <CustomEmojiPicker emoji={emoji} setEmoji={setEmoji} />
            </div>
            <div className='col-7'>
              <CustomInput
                label='Category'
                type='select'
                options={categoryOptions()}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleAdd}>
            Create
          </Button>
          <Button color='secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalAddItem;
