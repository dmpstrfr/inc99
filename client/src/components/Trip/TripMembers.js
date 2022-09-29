import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { FaCrown } from 'react-icons/fa';

const TripMembers = () => {
  const singleTrip = useSelector((state) => state.tripReducer.singleTrip);

  return (
    <Card className='inventory-card'>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Members
        </CardTitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        {singleTrip?.members?.map((member) => {
          return (
            <div className='row p-3 inventory-item justify-content-center'>
              <div className='col-4 d-flex justify-content-end'>
                {member?._id === singleTrip?.createdBy?._id && (
                  <FaCrown size={20} />
                )}
              </div>
              <div
                className='col-8 d-flex justify-content-start'
                style={{ fontSize: '1.25em' }}
              >
                {member?.name}
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default TripMembers;
