import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router-dom';
import CustomInput from 'components/CustomInput';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAllTripsOfGroup } from 'redux/actions/tripsActions';

const ModalAddTrip = ({ isOpen, setIsOpen }) => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const createTrip = async () => {
    const toastId = toast.loading('Creating trip...');
    await axios.post('trips/add', {
      ...formState,
      createdBy: currentUser?.userId,
      group: groupId,
    });
    dispatch(getAllTripsOfGroup(groupId));
    setIsOpen(false);
    setFormState({});
    toast.success('Trip created!', {
      id: toastId,
    });
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const selectOptions = () => {
    let options = [];
    options.push(
      <option value='' selected disabled>
        Select a status
      </option>,
      <option value={true}>Provided</option>,
      <option value={false}>Bring Your Own</option>
    );
    return options;
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} centered>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Create a trip!
        </ModalHeader>
        <ModalBody>
          <div className='container'>
            <CustomInput
              type='text'
              label='Trip name'
              name='name'
              onChange={inputChangeHandler}
            />
            <div className='row'>
              <div className='col-6'>
                <CustomInput
                  type='date'
                  label='Start Date'
                  name='startDate'
                  onChange={inputChangeHandler}
                />
              </div>
              <div className='col-6'>
                <CustomInput
                  type='date'
                  label='End Date'
                  name='endDate'
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <CustomInput
                  type='text'
                  label='Meeting Place'
                  name='meetingPlace'
                  onChange={inputChangeHandler}
                />
              </div>
              <div className='col-6'>
                <CustomInput
                  type='time'
                  label='Meeting Time'
                  name='meetingTime'
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
                <CustomInput
                  type='number'
                  label='Cost'
                  name='cost'
                  onChange={inputChangeHandler}
                />
              </div>
              <div className='col-4'>
                <CustomInput
                  type='number'
                  label='Distance'
                  name='distance'
                  onChange={inputChangeHandler}
                />
              </div>
              <div className='col-4'>
                <CustomInput
                  type='number'
                  label='RON'
                  name='ron'
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <CustomInput
                  type='select'
                  label='Shelter'
                  name='shelter'
                  options={selectOptions()}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className='col-6'>
                <CustomInput
                  type='select'
                  label='Food'
                  name='food'
                  options={selectOptions()}
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={createTrip}
            disabled={
              formState.startDate === '' ||
              formState.endDate === '' ||
              formState.name === ''
            }
          >
            Create
          </Button>
          <Button color='secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalAddTrip;
