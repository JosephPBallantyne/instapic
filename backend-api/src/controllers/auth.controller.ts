import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { User, UserData } from '../types/users.type';
import { RequestWithIdentity } from '../types/auth.type';

export interface IGetUserAuthInfoRequest extends Request {
  userId: number;
}

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserData = req.body;
    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserData = req.body;
    try {
      const { cookie, user } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({
        data: {
          id: user.id,
          username: user.username,
        },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    try {
      await this.authService.logout(userId);
      res.setHeader('Set-Cookie', [
        'Authorization=; Path=/; Max-age=0; Secure; SameSite=None;',
      ]);
      res.status(200).json({
        data: {
          success: true,
        },
        message: 'logout',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
