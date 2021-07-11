import { LOGIN, LOGOUT } from './actionTypes';

export const login = (username: string, email: string) => ({
  type: LOGIN,
  payload: {
    authenticated: true,
    username,
    email,
  },
});

export const logout = () => ({
  type: LOGOUT,
});
