import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import CustomBtn from '../CustomBtn';
import CustomInput from '../CustomInput';
import CustomEmojiPicker from 'components/CustomEmojiPicker';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const AddItem = ({ allCategories, setAllItems }) => {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  //adds an item
  const handleAdd = async () => {
    if (name !== '' && emoji && selectedCategory !== '') {
      const toastId = toast.loading('Adding item...');
      await axios.post('items/add', {
        name,
        emoji: emoji?.unified,
        createdBy: null,
        category: selectedCategory,
      });
      const response = await axios.get(`items/all/${currentUser?.userId}`);
      setAllItems(response?.data);
      toast.success('Item added!', {
        id: toastId,
      });
      setName('');
      setEmoji(null);
      setSelectedCategory(allCategories[0]?._id);
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
    allCategories?.map((category) => {
      options.push(<option value={category?._id}>{category?.name}</option>);
    });
    return options;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Add Item
        </CardTitle>
      </CardHeader>
      <CardBody>
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

export default AddItem;
