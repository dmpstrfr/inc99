import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Label,
} from 'reactstrap';

const TripInfo = () => {
  const singleTrip = useSelector((state) => state.tripReducer.singleTrip);

  return (
    <Card className='inventory-card'>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Details
        </CardTitle>
      </CardHeader>
      <CardBody
        style={{
          height: '321.2px',
          overflowY: 'scroll',
          fontSize: '16px',
          marginLeft: '20px',
        }}
      >
        <div className='row d-flex align-items-center ml-2 mb-2'>
          <p className='mb-0 mr-2'>Start Date:</p>
          <Label className='mb-0'>
            {moment(singleTrip?.startDate).format('Do MMM, YYYY')}
          </Label>
        </div>
        <div className='row d-flex align-items-center ml-2 mb-2'>
          <p className='mb-0 mr-2'>End Date:</p>
          <Label className='mb-0'>
            {moment(singleTrip?.endDate).format('Do MMM, YYYY')}
          </Label>
        </div>
        {singleTrip?.meetingTime && (
          <div className='row d-flex align-items-center ml-2 mb-2'>
            <p className='mb-0 mr-2'>Meeting Time:</p>
            <Label className='mb-0'>{singleTrip?.meetingTime}</Label>
          </div>
        )}
        {singleTrip?.meetingPlace && (
          <div className='row d-flex align-items-center ml-2 mb-2'>
            <p className='mb-0 mr-2'>Meeting Place:</p>
            <Label className='mb-0'>{singleTrip?.meetingPlace}</Label>
          </div>
        )}
        {singleTrip?.ron && (
          <div className='row d-flex align-items-center ml-2 mb-2'>
            <p className='mb-0 mr-2'>RON:</p>
            <Label className='mb-0'>{singleTrip?.ron} days</Label>
          </div>
        )}
        {singleTrip?.distance && (
          <div className='row d-flex align-items-center ml-2 mb-2'>
            <p className='mb-0 mr-2'>Distance:</p>
            <Label className='mb-0'>{singleTrip?.distance} KM</Label>
          </div>
        )}
        <div className='row d-flex align-items-center ml-2 mb-2'>
          <p className='mb-0 mr-2'>Food:</p>
          <Label className='mb-0'>
            {singleTrip?.food ? 'Provided' : 'Bring Your Own'}
          </Label>
        </div>
        <div className='row d-flex align-items-center ml-2 mb-2'>
          <p className='mb-0 mr-2'>Shelter:</p>
          <Label className='mb-0'>
            {singleTrip?.shelter ? 'Provided' : 'Bring Your Own'}
          </Label>
        </div>
        {singleTrip?.cost && (
          <div className='row d-flex align-items-center ml-2 mb-2'>
            <p className='mb-0 mr-2'>Cost:</p>
            <Label className='mb-0'>{singleTrip?.cost}$</Label>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TripInfo;
