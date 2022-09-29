import TripInfo from 'components/Trip/TripInfo';
import TripInventory from 'components/Trip/TripInventory';
import TripMembers from 'components/Trip/TripMembers';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTripInventory } from 'redux/actions/inventoryActions';
import { getSingleTrip } from 'redux/actions/tripsActions';

const TripDetail = () => {
  const { groupId, tripId } = useParams();
  const dispatch = useDispatch();

  const singleTrip = useSelector((state) => state.tripReducer.singleTrip);
  const tripInventory = useSelector(
    (state) => state.inventoryReducer.tripInventory
  );

  console.log(singleTrip);
  console.log(tripInventory);

  useEffect(() => {
    dispatch(getSingleTrip(tripId));
    dispatch(getTripInventory(tripId));
  }, []);

  return (
    <div className='content'>
      <h2 className='mb-1'>{singleTrip?.name}</h2>
      <p className='card-category mb-4'>
        <span style={{ fontWeight: '700' }}>Leader: </span>
        {singleTrip?.createdBy?.name}
      </p>
      <div className='row mt-3'>
        <div className='col-md-6'>
          <TripInfo />
        </div>
        <div className='col-md-6'>
          <TripInventory />
        </div>
      </div>
      <div className='row mt-3 d-flex justify-content-center'>
        <div className='col-md-6'>
          <TripMembers />
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
