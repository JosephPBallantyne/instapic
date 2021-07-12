import { Router } from 'express';
import { Route } from '../types/routes.type';

class DefaultRoute implements Route {
  public path = '/api/health';

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) =>
      res.status(200).json({ message: 'ok' })
    );
  }
}

export default DefaultRoute;
