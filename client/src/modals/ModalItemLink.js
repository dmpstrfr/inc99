import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import CustomEmojiPicker from 'components/CustomEmojiPicker';
import CustomInput from 'components/CustomInput';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalItemLink = ({ isOpen, setIsOpen, item }) => {
  const dispatch = useDispatch();

  const [link, setLink] = useState();

  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );

  useEffect(() => {
    setLink(item?.itemLink);
  }, [item]);

  const updateLink = async () => {
    const toastId = toast.loading('Updating item link...');
    await axios.patch('inventories/update/item-link', {
      inventory: inventory?._id,
      itemId: item?.item?._id,
      itemLink: link,
    });
    setIsOpen(false);
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
            label='Link'
            name='link'
            value={link ? link : ''}
            onChange={(e) => setLink(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={updateLink}>
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

export default ModalItemLink;
