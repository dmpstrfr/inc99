import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import CustomBtn from 'components/CustomBtn';
import ModalAddTrip from 'modals/ModalAddTrip';
import { ImEnter } from 'react-icons/im';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { getAllTripsOfGroup } from 'redux/actions/tripsActions';
import toast from 'react-hot-toast';

const Trips = () => {
  const history = useHistory();
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [modalAddTrip, setModalAddTrip] = useState(false);

  const singleGroup = useSelector((state) => state.groupReducer.singleGroup);
  const allTrips = useSelector((state) => state.tripReducer.tripsOfGroup);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const exitTrip = async (tripId) => {
    const toastId = toast.loading('Exiting trip...');
    await axios.patch('trips/remove/member', {
      trip: tripId,
      user: currentUser?.userId,
    });
    dispatch(getAllTripsOfGroup(groupId));
    toast.success('Trip exited!', {
      id: toastId,
    });
  };

  const joinTrip = async (tripId) => {
    const toastId = toast.loading('Joining trip...');
    await axios.patch('trips/add/member', {
      trip: tripId,
      user: currentUser?.userId,
    });
    dispatch(getAllTripsOfGroup(groupId));
    toast.success('Trip joined!', {
      id: toastId,
    });
  };

  return (
    <Card className='inventory-card'>
      <ModalAddTrip isOpen={modalAddTrip} setIsOpen={setModalAddTrip} />
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Group trips
        </CardTitle>
        <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
          The trips created by the group leader show up here! You can choose to
          join or exit a trip.
        </CardSubtitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        <div className='row'>
          {allTrips?.map((trip) => {
            return (
              <div className='col-lg-3 col-md-4 col-sm-6'>
                <Card
                  className='card-hover'
                  onClick={() =>
                    history.push(`/groups/${groupId}/${trip?._id}`)
                  }
                >
                  <CardBody className='single-category'>{trip?.name}</CardBody>
                  <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
                    Members: {trip?.members?.length}
                  </CardSubtitle>
                  <CardSubtitle
                    className='mb-2 text-muted d-flex justify-content-center'
                    style={{ fontSize: '11px' }}
                  >
                    {moment(trip?.startDate).format('Do MMM, YYYY')} -{' '}
                    {moment(trip?.endDate).format('Do MMM, YYYY')}
                  </CardSubtitle>

                  {trip?.members?.find(
                    (member) => member?._id === currentUser?.userId
                  ) ? (
                    <CustomBtn
                      style={{ margin: '0px 20px 10px 20px', padding: '8px' }}
                      type='danger'
                      text='Exit Trip'
                      onClick={() => exitTrip(trip?._id)}
                    />
                  ) : (
                    <CustomBtn
                      style={{ margin: '0px 20px 10px 20px', padding: '8px' }}
                      type='light'
                      text='Join Trip'
                      onClick={() => joinTrip(trip?._id)}
                    />
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </CardBody>
      <CardFooter className='d-flex justify-content-end align-items-center'>
        {currentUser?.userId === singleGroup?.owner?._id && (
          <CustomBtn
            type='light'
            text='Create a trip'
            onClick={() => setModalAddTrip(true)}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default Trips;
