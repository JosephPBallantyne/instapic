import { Router } from 'express';
import { AuthController } from '../controllers';
import { Route } from '../types/routes.type';
import authMiddleware from '../middlewares/auth.middleware';

class AuthRoute implements Route {
  public path = '/api/auth';

  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.authController.signUp);
    this.router.post(`${this.path}/login`, this.authController.logIn);
    this.router.post(
      `${this.path}/logout`,
      authMiddleware,
      this.authController.logOut
    );
  }
}

export default AuthRoute;
