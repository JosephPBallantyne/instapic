/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ApiContext } from '../../contexts/apiContextProvider';
import { SignUp } from '../../types/user.type';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.span`
  font-size: 30px;
  margin-bottom: 2rem;
`;

const SignUpPage: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>();
  const apiService = useContext(ApiContext);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [failed, setFailed] = useState(false);

  const onSubmit: SubmitHandler<SignUp> = useCallback(
    async (data: SignUp) => {
      const { password, username } = data;
      try {
        setFailed(false);
        await apiService.post('/auth/signup', {
          username,
          password,
        });
        const user = await apiService.post('/auth/login', {
          username,
          password,
        });
        if (user) {
          dispatch({ type: 'LOGIN', payload: { username } });
        }
      } catch (err) {
        setFailed(true);
        console.log(err);
      }
    },
    [dispatch]
  );

  return (
    <Container>
      <InsideContainer>
        <Header>Sign Up</Header> {auth.authenticated && <Redirect to="/" />}
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
                Sign Up
              </Button>
            </FormSection>
            {failed && (
              <p style={{ color: 'red', fontSize: '14px' }} className="my-2">
                Sign up failed, please try again
              </p>
            )}
          </form>
        )}
      </InsideContainer>
    </Container>
  );
};

export default SignUpPage;
