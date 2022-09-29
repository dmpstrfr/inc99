import React, { useEffect, useState } from 'react';
import EmojiRender from 'components/EmojiRender';
import InputNumber from 'rc-input-number';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from 'reactstrap';
import { VscCopy } from 'react-icons/vsc';
import toast from 'react-hot-toast';

const SingleInventory = ({ inventory }) => {
  return (
    <div className='col-sm-6'>
      <Card className='inventory-card'>
        <CardHeader>
          <CardTitle className='text-center' tag='h4'>
            {inventory?.name}
          </CardTitle>
          <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
            Created by: {inventory?.owner?.name}
          </CardSubtitle>
        </CardHeader>
        <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
          {inventory?.items?.map((item) => {
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
        <CardFooter className='d-flex justify-content-end align-items-center'></CardFooter>
      </Card>
    </div>
  );
};

export default SingleInventory;
