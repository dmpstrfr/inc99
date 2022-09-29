import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import EmojiRender from 'components/EmojiRender';
import ModalAddItem from 'modals/ModalAddItem';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { getSingleInventory } from 'redux/actions/inventoryActions';

const AddItems = ({ selectedItems, setSelectedItems }) => {
  const { inventoryId } = useParams();
  const dispatch = useDispatch();

  const [modalAddItem, setModalAddItem] = useState(false);

  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const categoryItems = useSelector((state) => state.itemReducer.items);
  const selectedCategory = useSelector(
    (state) => state.categoryReducer.selectedCategory
  );

  console.log(inventory);
  console.log(categoryItems);

  //selects de-selects items
  const handleItemClick = (item) => {
    for (let inventoryItem of inventory?.items) {
      if (inventoryItem?.item?._id === item?._id) {
        toast.error('Item already exists in inventory!');
        return;
      }
    }
    if (selectedItems.find((selectedItem) => selectedItem._id === item._id)) {
      let temp = selectedItems.filter(
        (selectedItem) => selectedItem._id !== item._id
      );
      setSelectedItems(temp);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleItemsAdd = async () => {
    const toastId = toast.loading('Adding items...');
    for (let item of selectedItems) {
      await axios.post(`/inventories/add/item`, {
        inventory: inventoryId,
        item: item?._id,
      });
    }
    dispatch(getSingleInventory(inventoryId));
    toast.success('Items added!', {
      id: toastId,
    });
    setSelectedItems([]);
  };

  return (
    <Card className='inventory-card'>
      <ModalAddItem isOpen={modalAddItem} setIsOpen={setModalAddItem} />
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Add items
        </CardTitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        <div className='row'>
          {categoryItems
            ?.filter((item) =>
              inventory?.nodedCategories?.includes(item?.category?._id)
            )
            ?.filter(
              (item) =>
                item?.category?._id === selectedCategory?._id ||
                selectedCategory == 0
            )
            ?.map((item) => {
              return (
                <div
                  className={`col-4 text-center ${
                    selectedItems.find(
                      (selectedItem) => selectedItem._id === item._id
                    )
                      ? 'selected-item'
                      : 'card-hover'
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <EmojiRender emoji={item?.emoji} />
                  {item?.name}

                  <div className='text-muted'>{item?.category?.name}</div>
                </div>
              );
            })}
        </div>
      </CardBody>
      <CardFooter className='d-flex justify-content-between'>
        <CustomBtn
          type='light'
          text='Create new item'
          onClick={() => setModalAddItem(true)}
        />
        <CustomBtn
          disabled={selectedItems?.length == 0}
          text='Add items'
          onClick={handleItemsAdd}
        />
      </CardFooter>
    </Card>
  );
};

export default AddItems;
