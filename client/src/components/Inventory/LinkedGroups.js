import EmojiRender from 'components/EmojiRender';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from 'reactstrap';
import Switch from 'react-switch';
import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import InputNumber from 'rc-input-number';
import toast from 'react-hot-toast';
import { getSingleInventory } from 'redux/actions/inventoryActions';
import ModalLinkGroup from 'modals/ModalLinkGroup';
import { useHistory } from 'react-router-dom';

const LinkedGroups = () => {
  const history = useHistory();

  const [modalLinkGroup, setModalLinkGroup] = useState(false);

  const inventory = useSelector(
    (state) => state.inventoryReducer.singleInventory
  );

  return (
    <Card className='inventory-card'>
      <ModalLinkGroup isOpen={modalLinkGroup} setIsOpen={setModalLinkGroup} />
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Linked groups
        </CardTitle>
        <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
          Groups linked with inventories have access to view your items.
        </CardSubtitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        <div className='row'>
          {inventory?.sharedWith?.map((group) => {
            return (
              <div className='col-lg-3 col-md-4 col-sm-6'>
                <Card
                  className='card-hover'
                  onClick={() => history.push(`/groups/${group?._id}`)}
                >
                  <CardBody className='single-category'>{group?.name}</CardBody>
                  <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
                    Members: {group?.members?.length}
                  </CardSubtitle>
                </Card>
              </div>
            );
          })}
        </div>
      </CardBody>
      <CardFooter className='d-flex justify-content-end align-items-center'>
        <CustomBtn
          type='light'
          text='Link a group'
          onClick={() => setModalLinkGroup(true)}
        />
      </CardFooter>
    </Card>
  );
};

export default LinkedGroups;
