import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardBody, CardTitle, Label } from 'reactstrap';
import Select from 'react-select';
import CustomInput from 'components/CustomInput';
import CustomBtn from 'components/CustomBtn';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from 'redux/actions/groupActions';

const AddGroup = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const allStandardUsers = useSelector(
    (state) => state.userReducer.allStandardUsers
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const addGroup = async () => {
    const toastId = toast.loading('Creating group...');
    let tempUsers = [];
    users?.map((user) => {
      tempUsers.push(user.value);
    });
    await axios.post('groups/add', {
      name: name,
      owner: currentUser?.userId,
      members: tempUsers,
    });
    setUsers([]);
    setName('');
    dispatch(getAllGroups());
    toast.success('Group created!', {
      id: toastId,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Create new group
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CustomInput
          label='Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Users</Label>
        <Select
          isMulti
          value={users}
          name='colors'
          options={allStandardUsers?.map((user) => {
            return {
              label: user?.name,
              value: user?.userId,
            };
          })}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={(e) => setUsers(e)}
        />
        <div className='d-flex justify-content-end'>
          <CustomBtn
            style={{
              width: '25%',
              marginTop: '20px',
            }}
            text='Add'
            disabled={name === ''}
            onClick={addGroup}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default AddGroup;
