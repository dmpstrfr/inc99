import EmojiRender from 'components/EmojiRender';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from 'reactstrap';
import InputNumber from 'rc-input-number';
import { VscCopy } from 'react-icons/vsc';

const JointInventory = () => {
  const dispatch = useDispatch();

  const jointInventory = useSelector(
    (state) => state.inventoryReducer.jointInventory
  );

  return (
    <Card className='inventory-card'>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Joint Inventory
        </CardTitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        {jointInventory?.map((item) => {
          return (
            <div className='row p-2 inventory-item justify-content-center'>
              <div className='col-2 d-flex align-items-center justify-content-center'>
                <EmojiRender emoji={item?.item?.emoji} />
              </div>
              <div className='col-5 d-flex  align-items-center justify-content-center'>
                {item?.item?.name}
              </div>
              <div className='col-2 d-flex align-items-center justify-content-center'>
                <a target='_blank' href={item?.itemLink}>
                  {item?.itemLink && <VscCopy size={20} />}
                </a>
              </div>
              <div className='col-3 d-flex  align-items-center justify-content-center'>
                <InputNumber
                  value={item?.quantity}
                  disabled={true}
                  controls={false}
                />
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default JointInventory;
