import { Router } from 'express';
import { AuthController } from '../controllers';
import { Route } from '../types/routes.type';

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
    this.router.post(`${this.path}/logout`, this.authController.logOut);
  }
}

export default AuthRoute;
