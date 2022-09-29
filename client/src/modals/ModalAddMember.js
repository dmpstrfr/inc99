import axios from 'axios';
import React, { useState } from 'react';
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
import Select from 'react-select';
import { getSingleGroup } from 'redux/actions/groupActions';
import { useParams } from 'react-router-dom';

const ModalAddMembers = ({ isOpen, setIsOpen, item }) => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [selectedUsers, setSelectedUsers] = useState([]);

  const allStandardUsers = useSelector(
    (state) => state.userReducer.allStandardUsers
  );
  const singleGroup = useSelector((state) => state.groupReducer.singleGroup);

  const addMember = async () => {
    const toastId = toast.loading('Adding members...');
    for (let user of selectedUsers) {
      await axios.patch('groups/add/member', {
        user: user?.value,
        group: groupId,
      });
    }
    setIsOpen(false);
    dispatch(getSingleGroup(groupId));
    toast.success('Member added!', {
      id: toastId,
    });
  };

  const userOptions = () => {
    let options = [];
    allStandardUsers?.map((user) => {
      let found = false;
      singleGroup?.members?.map((member) => {
        if (user?.userId === member?._id) found = true;
      });
      if (!found)
        options.push({
          label: user?.name,
          value: user?.userId,
        });
    });
    return options;
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} centered>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Add members to this group!
        </ModalHeader>
        <ModalBody>
          <Label>Users</Label>
          <Select
            isMulti
            value={selectedUsers}
            name='colors'
            options={userOptions()}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={(e) => setSelectedUsers(e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={addMember}
            disabled={selectedUsers.length == 0}
          >
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

export default ModalAddMembers;
