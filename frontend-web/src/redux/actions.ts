import { LOGIN, LOGOUT } from './actionTypes';

export const login = (username: string) => ({
  type: LOGIN,
  payload: {
    authenticated: true,
    username,
  },
});

export const logout = () => ({
  type: LOGOUT,
});
