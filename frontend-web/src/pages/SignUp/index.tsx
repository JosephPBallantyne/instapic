/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts/apiContextProvider';
import { SignUp } from '../../types/user.type';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const SignUpPage: React.FunctionComponent = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>();
  const apiService = useContext(ApiContext);

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    const { password, username } = data;
    try {
      await apiService.post('/auth/signup', {
        username,
        password,
      });
      await apiService.post('/auth/login', {
        username,
        password,
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <div>
          <div className="form-group column">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              {...register('username', { required: 'Username required' })}
            />
            {errors.username && (
              <p style={{ color: 'red', fontSize: '14px' }} className="my-2">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="form-group column">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              {...register('password', { required: 'Password required' })}
            />
            {errors.password && (
              <p style={{ color: 'red', fontSize: '14px' }} className="my-2">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection>
        <Button type="submit" size="sm">
          Sign Up
        </Button>
      </FormSection>
    </form>
  );
};

export default SignUpPage;
