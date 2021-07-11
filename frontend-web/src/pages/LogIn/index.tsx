/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ApiContext } from '../../contexts/apiContextProvider';
import { Login } from '../../types/user.type';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoginPage: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const apiService = useContext(ApiContext);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Login> = useCallback(
    async (data: Login) => {
      const { username, password } = data;
      try {
        const user = await apiService.post('/auth/login', {
          username,
          password,
        });
        if (user) {
          dispatch({ type: 'LOGIN', payload: { username } });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return (
    <>
      {auth.authenticated && <Redirect to="/" />}
      {!auth.authenticated && (
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
                  <p
                    style={{ color: 'red', fontSize: '14px' }}
                    className="my-2"
                  >
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="form-group column">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password required' })}
                />
                {errors.password && (
                  <p
                    style={{ color: 'red', fontSize: '14px' }}
                    className="my-2"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection>
            <Button type="submit" size="sm">
              Login
            </Button>
          </FormSection>
        </form>
      )}
    </>
  );
};

export default LoginPage;
