import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardSubtitle } from 'reactstrap';

const AllGroups = () => {
  const allGroups = useSelector((state) => state.groupReducer.allGroups);

  return (
    <div className='row'>
      {allGroups?.map((group) => {
        return (
          <div className='col-md-6'>
            <Card className='card-hover'>
              <CardBody className='single-category'>{group?.name}</CardBody>
              <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
                Created by: {group?.owner?.name}
              </CardSubtitle>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AllGroups;
