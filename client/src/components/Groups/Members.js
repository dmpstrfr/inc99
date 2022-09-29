import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from 'reactstrap';
import axios from 'axios';
import CustomBtn from 'components/CustomBtn';
import toast from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { IoMdRemoveCircle } from 'react-icons/io';
import { getAllStandardUsers } from 'redux/actions/userActions';
import ModalAddMembers from 'modals/ModalAddMember';
import { getSingleGroup } from 'redux/actions/groupActions';
import { useParams } from 'react-router-dom';

const Members = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [modalAddMembers, setModalAddMembers] = useState(false);

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const singleGroup = useSelector((state) => state.groupReducer.singleGroup);

  useEffect(() => {
    dispatch(getAllStandardUsers());
  }, []);

  const removeMember = async (userId) => {
    const toastId = toast.loading('Removing member...');
    await axios.patch('groups/remove/member', {
      user: userId,
      group: singleGroup?._id,
    });
    dispatch(getSingleGroup(groupId));
    toast.success('Member removed!', {
      id: toastId,
    });
  };

  return (
    <Card className='inventory-card'>
      <ModalAddMembers
        isOpen={modalAddMembers}
        setIsOpen={setModalAddMembers}
      />
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Members
        </CardTitle>
      </CardHeader>
      <CardBody style={{ height: '321.2px', overflowY: 'scroll' }}>
        {singleGroup?.members?.map((member) => {
          return (
            <div className='row p-3 inventory-item justify-content-center'>
              <div className='col-2 d-flex justify-content-end'>
                {member?._id === singleGroup?.owner?._id && (
                  <FaCrown size={20} />
                )}
              </div>
              <div
                className='col-8 d-flex justify-content-center'
                style={{ fontSize: '1.25em' }}
              >
                {member?.name}
              </div>
              <div className='col-2 d-flex justify-content-end'>
                {currentUser?.userId === singleGroup?.owner?._id && (
                  <IoMdRemoveCircle
                    size={20}
                    color='red'
                    className='hvr-grow'
                    onClick={() => removeMember(member?._id)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className='d-flex justify-content-between align-items-center'>
        <p className='card-category'>
          Total members: {singleGroup?.members?.length}
        </p>
        {currentUser?.userId === singleGroup?.owner?._id && (
          <CustomBtn
            type='light'
            text='Add members'
            onClick={() => setModalAddMembers(true)}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default Members;
