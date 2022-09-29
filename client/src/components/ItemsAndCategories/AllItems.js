import axios from 'axios';
import EmojiRender from 'components/EmojiRender';
import React from 'react';
import toast from 'react-hot-toast';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
} from 'reactstrap';

const AllItems = ({ allItems }) => {
  //   const handleDelete = async (categoryId) => {
  //     const toastId = toast.loading('Deleting category...');
  //     await axios.delete(`categories/${categoryId}`);
  //     const response = await axios.get('categories/all');
  //     setAllCategories(response?.data?.categories);
  //     toast.success('Category deleted!', {
  //       id: toastId,
  //     });
  //   };

  return (
    <div className='row'>
      {allItems?.map((item) => {
        return (
          <div className='col-6'>
            <Card>
              <CardBody className='single-category'>
                <EmojiRender emoji={item?.emoji} />
                {item?.name}
                <CardSubtitle className='mb-2 text-muted'>
                  {item?.category?.name}
                </CardSubtitle>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AllItems;
