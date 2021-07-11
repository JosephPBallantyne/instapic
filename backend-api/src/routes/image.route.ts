import { Router } from 'express';
import multer from 'multer';
import { ImageController } from '../controllers';
import { Route } from '../types/routes.type';

const upload = multer();
const uploadFields = upload.fields([{ name: 'file', maxCount: 1 }]);

class ImageRoute implements Route {
  public path = '/api/image';

  public router = Router();

  public imageController = new ImageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      uploadFields,
      this.imageController.upload
    );
    this.router.get(`${this.path}/:id(\\d+)`, this.imageController.getImage);
  }
}

export default ImageRoute;
