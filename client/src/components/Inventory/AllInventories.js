import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardSubtitle } from 'reactstrap';

const AllInventories = () => {
  const history = useHistory();
  const inventories = useSelector(
    (state) => state.inventoryReducer.allInventories
  );

  return (
    <div className='row'>
      {inventories?.map((inventory) => {
        return (
          <div className='col-md-6'>
            <Card
              className='card-hover'
              onClick={() => history.push(`/inventory/${inventory?._id}`)}
            >
              <CardBody className='single-category'>{inventory?.name}</CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AllInventories;
