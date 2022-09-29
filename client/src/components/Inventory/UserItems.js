import EmojiRender from 'components/EmojiRender';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from 'reactstrap';
import Switch from 'react-switch';
import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import InputNumber from 'rc-input-number';
import toast from 'react-hot-toast';
import { getSingleInventory } from 'redux/actions/inventoryActions';
import ModalItemLink from 'modals/ModalItemLink';

const UserItems = () => {
  const dispatch = useDispatch();

  const [currentItem, setCurrentItem] = useState();
  const [modalAddLink, setModalAddLink] = useState(false);
  const [updatedQuantities, setUpdatedQuantities] = useState([]);

  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const selectedCategory = useSelector(
    (state) => state.categoryReducer.selectedCategory
  );

  //handles the update of quantity
  const handleQuantityChange = (newValue, oldItem) => {
    let temp = JSON.parse(JSON.stringify(updatedQuantities));
    let updated = false;
    temp?.map((item) => {
      if (item?._id === oldItem?.item?._id) {
        item.quantity = newValue;
        updated = true;
      }
    });
    if (!updated) {
      temp.push({
        _id: oldItem?.item?._id,
        category: oldItem?.item?.category,
        quantity: newValue,
      });
    }
    setUpdatedQuantities(temp);
  };

  const saveChanges = async () => {
    const toastId = toast.loading('Adding items...');
    await axios.patch('/inventories/update/item', {
      inventory: inventory?._id,
      items: updatedQuantities,
    });
    toast.success('Items added!', {
      id: toastId,
    });
  };

  const handleDelete = async (item) => {
    const toastId = toast.loading('Deleting item...');
    await axios.patch(`inventories/remove/item`, {
      inventory: inventory?._id,
      item: item?.item?._id,
    });
    dispatch(getSingleInventory(inventory?._id));
    toast.success('Item deleted!', {
      id: toastId,
    });
  };

  return (
    <Card className='inventory-card'>
      <ModalItemLink
        isOpen={modalAddLink}
        setIsOpen={setModalAddLink}
        item={currentItem}
      />
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Your items
        </CardTitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        {inventory?.items
          ?.filter(
            (item) =>
              item?.item?.category === selectedCategory?._id ||
              selectedCategory == 0
          )
          ?.map((item) => {
            return (
              <div className='row p-2 inventory-item'>
                <div className='col-2 d-flex align-items-center justify-content-center'>
                  <EmojiRender emoji={item?.item?.emoji} />
                </div>
                <div className='col-3 d-flex  align-items-center justify-content-center'>
                  {item?.item?.name}
                </div>
                <div className='col-2 d-flex  align-items-center justify-content-center'>
                  <CustomBtn
                    type='light'
                    text='Item link'
                    style={{ padding: 1, fontSize: '10px' }}
                    onClick={() => {
                      setModalAddLink(true);
                      setCurrentItem(item);
                    }}
                  />
                </div>
                <div className='col-3 d-flex  align-items-center justify-content-center'>
                  <InputNumber
                    value={
                      updatedQuantities.find(
                        (newItem) => newItem?._id === item?.item?._id
                      )?.quantity
                        ? updatedQuantities.find(
                            (newItem) => newItem?._id === item?.item?._id
                          )?.quantity
                        : item?.quantity
                    }
                    min={1}
                    step={1}
                    controls={true}
                    onChange={(value) => handleQuantityChange(value, item)}
                  />
                </div>
                <div className='col-2 d-flex  align-items-center justify-content-center'>
                  <img
                    onClick={() => handleDelete(item)}
                    src='/delete-icon.png'
                    width='22px'
                    height='22px'
                  />
                </div>
              </div>
            );
          })}
      </CardBody>
      <CardFooter className='d-flex justify-content-end align-items-center'>
        <CustomBtn
          text='Save changes'
          onClick={saveChanges}
          disabled={updatedQuantities.length == 0}
        />
      </CardFooter>
    </Card>
  );
};

export default UserItems;
