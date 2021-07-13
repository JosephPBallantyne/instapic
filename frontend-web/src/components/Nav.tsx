import styled from 'styled-components';
import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { ApiContext } from '../contexts/apiContextProvider';

const StyledNav = styled.nav`
  z-index: 1;
  border-bottom: solid;
  border-bottom-width: 1px;
  border-color: lightgray;
`;

const Text = styled.div`
  color: darkslategray;
`;

const BlueText = styled.div`
  color: steelblue;
  font-style: bold;
`;

const Nav = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const apiService = useContext(ApiContext);
  const logout = useCallback(async () => {
    try {
      await apiService.post('/auth/logout', {});
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  return (
    <StyledNav className="navbar navbar-dark navbar-expand-lg">
      <div className="container">
        <Link to="/" className="navbar-brand text">
          <Text>InstaPic</Text>
        </Link>

        <div className="collpase navbar-collapse">
          {!auth.authenticated && (
            <ul className="navbar-nav ml-auto">
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  <BlueText>Log In</BlueText>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="nav-link">
                  <Text>Sign Up</Text>
                </Link>
              </li>
            </ul>
          )}
          {auth.authenticated && (
            <ul className="navbar-nav ml-auto">
              <NavDropdown
                id="nav"
                title={<span className="text-primary">{auth.username}</span>}
                className="nav-item dropdown"
              >
                <NavDropdown.Item onClick={() => logout()}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
          )}
        </div>
      </div>
    </StyledNav>
  );
};

export default Nav;
