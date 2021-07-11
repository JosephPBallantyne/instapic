import { AnyAction } from 'redux';
import { LOGIN, LOGOUT } from '../actionTypes';

interface Auth {
  authenticated: boolean;
  username: string | null;
  email: string | null;
}

const initialState: Auth = {
  authenticated: false,
  username: null,
  email: null,
};

const auth = function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case LOGIN: {
      const { username, email } = action.payload;
      return {
        authenticated: true,
        username,
        email,
      };
    }
    case LOGOUT: {
      return {
        authenticated: false,
        username: null,
        email: null,
      };
    }
    default:
      return state;
  }
};

export default auth;
