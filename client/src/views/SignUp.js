import CustomInput from 'components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import * as yup from 'yup';
import CustomBtn from 'components/CustomBtn';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setCurrentUser } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(4, 'Password is too short - must be at least 4 chars.'),
  confirmPassword: yup
    .string()
    .required('Please enter your password.')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const [errors, setErrors] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  //validates name
  useEffect(() => {
    yup
      .reach(schema, 'name')
      .validate(formState.name)
      .then((valid) => setErrors({ ...errors, name: false }))
      .catch(() => setErrors({ ...errors, name: true }));
  }, [formState.name]);

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

  //validates confirmPassword
  useEffect(() => {
    if (formState.confirmPassword === formState.password)
      setErrors({ ...errors, confirmPassword: false });
    else setErrors({ ...errors, confirmPassword: true });
  }, [formState.confirmPassword]);

  //creates account and signs in user
  const handleSubmit = async () => {
    const toastId = toast.loading('Creating account...');
    try {
      const response = await axios.post('users/sign-up', {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        permission: 'STANDARD',
      });
      toast.success(`Welcome, ${response.data.name}`, {
        id: toastId,
      });
      history.push('/inventory');
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      dispatch(setCurrentUser(response.data));
    } catch (err) {
      toast.error('User with this email already exists!', {
        id: toastId,
      });
    }
  };

  return (
    <div className='auth-view-container'>
      <div className='container min-vh-100 d-flex align-items-center justify-content-center'>
        <div className='col-md-5'>
          <Card>
            <CardHeader>
              <CardTitle className='text-center' tag='h2'>
                Sign-Up
              </CardTitle>
              <p className='text-center card-category'>
                Already have an account?{' '}
                <span
                  onClick={() => history.push('/sign-in')}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Sign In
                </span>
                .
              </p>
            </CardHeader>
            <CardBody>
              <CustomInput
                label='Name'
                name='name'
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                valid={
                  typeof formState.name !== 'undefined' ? !errors.name : null
                }
                invalid={
                  typeof formState.name !== 'undefined' ? errors.name : null
                }
              />
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
              <CustomInput
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                value={formState.confirmPassword}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    confirmPassword: e.target.value,
                  })
                }
                valid={
                  typeof formState.confirmPassword !== 'undefined'
                    ? !errors.confirmPassword
                    : null
                }
                invalid={
                  typeof formState.confirmPassword !== 'undefined'
                    ? errors.confirmPassword
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
                  disabled={
                    errors.email ||
                    errors.password ||
                    errors.name ||
                    errors.confirmPassword
                  }
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

export default SignUp;
