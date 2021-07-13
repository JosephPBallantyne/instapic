/* eslint-disable jest/no-conditional-expect */
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AuthService from './auth.service';
import { User } from '../types/users.type';
import UserModel from '../db/models/users.model';

const token = 'token';
const expiresIn = 3600;
const user = { id: 1, username: 'user', password: 'password' } as User;
const mockedUserModel = UserModel as jest.Mocked<any>;

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => {
    return token;
  }),
}));

describe('Unit Test: Auth Service', () => {
  let authService: AuthService;
  beforeAll(async () => {
    authService = new AuthService();
  });
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('createJwtToken', () => {
    it('creates jwt token', () => {
      expect.assertions(2);
      const res = AuthService.createJwtToken(user);
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject({
        expiresIn,
        token,
      });
    });
    it('cannot sign jwt', () => {
      expect.assertions(1);
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        return undefined;
      });
      expect(() => AuthService.createJwtToken(user)).toThrowError(
        expect.any(Error)
      );
    });
  });

  describe('createCookie', () => {
    it('returns string', () => {
      expect.assertions(1);
      const tokenData = {
        token,
        expiresIn,
      };
      const res = AuthService.createCookie(tokenData);
      expect(res).toEqual(
        `Authorization=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};`
      );
    });
  });

  describe('sign up', () => {
    it('signs user up', async () => {
      expect.assertions(1);
      const password = 'hashedPassword';
      const mockedFoundUser = {
        ...user,
        toJSON: jest.fn(() => {
          return {
            ...user,
            password,
          };
        }),
      };
      jest.spyOn(mockedUserModel, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => {
        return password;
      });
      jest
        .spyOn(mockedUserModel, 'create')
        .mockResolvedValueOnce(mockedFoundUser);
      const res = await authService.signup(user);
      expect(res).toEqual({
        ...user,
        password,
      });
    });
    it('username already exists', async () => {
      expect.assertions(1);
      jest.spyOn(mockedUserModel, 'findOne').mockImplementation(async () => {
        return user;
      });
      return authService
        .signup(user)
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
  });

  describe('login', () => {
    it('logs user in', async () => {
      expect.assertions(3);
      const mockedFoundUser = {
        ...user,
        toJSON: jest.fn(() => {
          return user;
        }),
      };
      jest
        .spyOn(mockedUserModel, 'findOne')
        .mockResolvedValueOnce(mockedFoundUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        return true;
      });
      const mockedJwtToken = jest.fn().mockReturnValue({
        token,
        expiresIn,
      });
      const mockedCreateCookie = jest.fn().mockReturnValue('cookie');
      AuthService.createCookie = mockedCreateCookie;
      AuthService.createJwtToken = mockedJwtToken;
      const res = await authService.login(user);
      expect(AuthService.createJwtToken).toHaveBeenCalledTimes(1);
      expect(AuthService.createCookie).toHaveBeenCalledTimes(1);
      expect(res).toEqual({ cookie: 'cookie', user });
    });
    it('username not found', async () => {
      expect.assertions(1);
      jest.spyOn(mockedUserModel, 'findOne').mockImplementation(async () => {
        return undefined;
      });
      return authService
        .login(user)
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
    it('password not found', async () => {
      expect.assertions(1);
      const mockedFoundUser = {
        ...user,
        toJSON: jest.fn(() => {
          return user;
        }),
      };
      jest
        .spyOn(mockedUserModel, 'findOne')
        .mockResolvedValueOnce(mockedFoundUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        return false;
      });
      return authService
        .login(user)
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
  });

  describe('logout', () => {
    it('logs user out', async () => {
      expect.assertions(1);
      const mockedFoundUser = {
        ...user,
        toJSON: jest.fn(() => {
          return user;
        }),
      };
      jest
        .spyOn(mockedUserModel, 'findOne')
        .mockResolvedValueOnce(mockedFoundUser);

      const res = await authService.logout(user.id);
      expect(res).toEqual(user);
    });
    it('user not found', async () => {
      expect.assertions(1);
      jest.spyOn(mockedUserModel, 'findOne').mockImplementation(async () => {
        return undefined;
      });
      return authService
        .logout(user.id)
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
  });
});
