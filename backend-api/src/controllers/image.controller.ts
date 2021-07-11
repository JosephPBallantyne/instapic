import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
// import { sequelize } from '../db/models/index.model';
import ImageService from '../services/image.service';
import { RequestWithFile } from '../types/request.type';
import Uploader from '../utils/s3';

class ImageController {
  public imageService = new ImageService();

  public upload = async (
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) => {
    // const transaction = await sequelize.transaction();
    try {
      const [file] = req.files.file;
      const { buffer: fileBuffer, mimetype, originalname } = file;
      const uuid = uuidv4();
      const filename = `${uuid}-${originalname}`;
      const bucket = process.env.AWS_BUCKET_NAME;

      await Uploader(bucket, fileBuffer, mimetype, filename);
      await this.imageService.upload();

      // await transaction.commit();
      res.status(200).json({
        data: {
          success: true,
        },
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };

  public getImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageId = Number(req.params.id);
      const image = await this.imageService.getImage(imageId);
      res.status(200).json({
        data: {
          success: true,
          id: image.id,
        },
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ImageController;
