import CustomInput from 'components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import * as yup from 'yup';
import CustomBtn from 'components/CustomBtn';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from 'redux/actions/userActions';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('You must enter a valid email')
    .required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: undefined,
    password: undefined,
  });
  const [errors, setErrors] = useState({
    email: true,
    password: true,
  });

  //validates email
  useEffect(() => {
    yup
      .reach(schema, 'email')
      .validate(formState.email)
      .then((valid) => setErrors({ ...errors, email: false }))
      .catch(() => setErrors({ ...errors, email: true }));
  }, [formState.email]);

  //validates password
  useEffect(() => {
    yup
      .reach(schema, 'password')
      .validate(formState.password)
      .then((valid) => setErrors({ ...errors, password: false }))
      .catch(() => setErrors({ ...errors, password: true }));
  }, [formState.password]);

  const handleSubmit = async () => {
    const toastId = toast.loading('Signing in...');
    try {
      const response = await axios.post('users/sign-in', {
        email: formState.email,
        password: formState.password,
      });
      toast.success(`Welcome, ${response.data.name}`, {
        id: toastId,
      });
      if (response.data?.permission === 'STANDARD') history.push('/inventory');
      else history.push('/items');
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      dispatch(setCurrentUser(response.data));
    } catch (err) {
      if (!err.response.data.isEmailMatch) {
        toast.error('Account does not exist!', {
          id: toastId,
        });
      }
      if (
        err.response.data.isEmailMatch &&
        !err.response.data.isPasswordMatch
      ) {
        toast.error('Invalid password!', {
          id: toastId,
        });
      }
    }
  };

  return (
    <div className='auth-view-container'>
      <div className='container min-vh-100 d-flex align-items-center justify-content-center'>
        <div className='col-md-5'>
          <Card>
            <CardHeader>
              <CardTitle className='text-center' tag='h2'>
                Sign-In
              </CardTitle>
              <p className='text-center card-category'>
                Don't have an account?{' '}
                <span
                  onClick={() => history.push('/sign-up')}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Sign up
                </span>
                .
              </p>
            </CardHeader>
            <CardBody>
              <CustomInput
                label='Email'
                name='email'
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                valid={
                  typeof formState.email !== 'undefined' ? !errors.email : null
                }
                invalid={
                  typeof formState.email !== 'undefined' ? errors.email : null
                }
              />
              <CustomInput
                label='Password'
                name='password'
                type='password'
                value={formState.password}
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
                valid={
                  typeof formState.password !== 'undefined'
                    ? !errors.password
                    : null
                }
                invalid={
                  typeof formState.password !== 'undefined'
                    ? errors.password
                    : null
                }
              />
              <div className='d-flex justify-content-center'>
                <CustomBtn
                  style={{
                    width: '50%',
                    borderRadius: '100px',
                    marginTop: '20px',
                  }}
                  text='Sign In'
                  disabled={errors.email || errors.password}
                  onClick={handleSubmit}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
