import { AnyAction } from 'redux';
import { LOGIN, LOGOUT } from '../actionTypes';

interface Auth {
  authenticated: boolean;
  username: string | null;
}

const initialState: Auth = {
  authenticated: false,
  username: null,
};

const auth = function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case LOGIN: {
      const { username } = action.payload;
      return {
        authenticated: true,
        username,
      };
    }
    case LOGOUT: {
      return {
        authenticated: false,
        username: null,
      };
    }
    default:
      return state;
  }
};

export default auth;
