import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import CustomEmojiPicker from 'components/CustomEmojiPicker';
import CustomInput from 'components/CustomInput';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import { getAllGroups } from 'redux/actions/groupActions';
import Select from 'react-select';

const ModalAddGroup = ({ isOpen, setIsOpen, item }) => {
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
    setIsOpen(false);
    dispatch(getAllGroups(currentUser?.userId));
    toast.success('Group created!', {
      id: toastId,
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} centered>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Add the item link for {item?.item?.name}
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={addGroup}>
            Add
          </Button>
          <Button color='secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalAddGroup;
