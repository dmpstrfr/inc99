import CustomBtn from 'components/CustomBtn';
import ModalAddGroup from 'modals/ModalAddGroup';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from 'reactstrap';

const UserGroups = () => {
  const history = useHistory();

  const [modalAddGroup, setModalAddGroup] = useState(false);

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const allGroups = useSelector((state) => state.groupReducer.allGroups);

  return (
    <Card>
      <ModalAddGroup isOpen={modalAddGroup} setIsOpen={setModalAddGroup} />
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Your groups
        </CardTitle>
        <CardSubtitle className='mb-2 text-muted text-center'>
          These are the groups that have been created by you, you are the leader
          of these groups.
        </CardSubtitle>
      </CardHeader>
      <CardBody style={{ height: '400px', overflowY: 'scroll' }}>
        <div className='row'>
          {allGroups
            ?.filter((group) => group.owner?._id === currentUser?.userId)
            ?.map((group) => {
              return (
                <div className='col-md-6'>
                  <Card
                    className='card-hover'
                    onClick={() => history.push(`/groups/${group?._id}`)}
                  >
                    <CardBody className='single-category'>
                      {group?.name}
                    </CardBody>
                    <CardSubtitle className='mb-2 text-muted d-flex justify-content-center'>
                      Members: {group?.members?.length}
                    </CardSubtitle>
                  </Card>
                </div>
              );
            })}
        </div>
      </CardBody>
      <CardFooter className='d-flex justify-content-between'>
        <CustomBtn
          type='light'
          text='Create new group'
          onClick={() => setModalAddGroup(true)}
        />
      </CardFooter>
    </Card>
  );
};

export default UserGroups;
