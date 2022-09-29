import CustomBtn from 'components/CustomBtn';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from 'reactstrap';

const AddedGroups = () => {
  const history = useHistory();

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const allGroups = useSelector((state) => state.groupReducer.allGroups);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center' tag='h4'>
          Added Groups
        </CardTitle>
        <CardSubtitle className='mb-2 text-muted text-center'>
          These are the groups that you have been added to by other group
          leaders.
        </CardSubtitle>
      </CardHeader>
      <CardBody style={{ height: '440px', overflowY: 'scroll' }}>
        <div className='row'>
          {allGroups
            ?.filter((group) => group.owner?._id !== currentUser?.userId)
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
      <CardFooter className='d-flex justify-content-between'></CardFooter>
    </Card>
  );
};

export default AddedGroups;
