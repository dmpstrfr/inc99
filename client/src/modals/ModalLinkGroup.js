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
import { getSingleInventory } from 'redux/actions/inventoryActions';

const ModalLinkGroup = ({ isOpen, setIsOpen, item }) => {
  const dispatch = useDispatch();

  const [selectedGroups, setSelectedGroups] = useState([]);

  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );
  const allGroups = useSelector((state) => state.groupReducer.allGroups);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const linkGroup = async () => {
    const toastId = toast.loading('Linking groups with inventory...');
    for (let group of selectedGroups) {
      await axios.patch('inventories/node/group', {
        inventory: inventory?._id,
        group: group.value,
      });
    }
    dispatch(getSingleInventory(inventory?._id));
    setIsOpen(false);
    toast.success('Groups linked!', {
      id: toastId,
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} centered>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Link groups with this inventory!
        </ModalHeader>
        <ModalBody>
          <Label>Groups</Label>
          <Select
            isMulti
            value={selectedGroups}
            name='colors'
            options={allGroups?.map((group) => {
              return {
                label: group?.name,
                value: group?._id,
              };
            })}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={(e) => setSelectedGroups(e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={linkGroup}
            disabled={selectedGroups.length == 0}
          >
            Link
          </Button>
          <Button color='secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalLinkGroup;
