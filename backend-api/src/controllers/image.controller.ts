import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../db/models/index.model';
import ImageService from '../services/image.service';
import { RequestWithFile } from '../types/request.type';
import S3 from '../utils/s3';

class ImageController {
  public imageService = new ImageService();

  public s3 = new S3();

  public upload = async (
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) => {
    const transaction = await sequelize.transaction();
    try {
      const { userId } = req;
      const [file] = req.files.file;
      const { description } = req.body;
      const { buffer: fileBuffer, mimetype, originalname } = file;
      const uuid = uuidv4();
      const filename = `${uuid}-${originalname}`;
      const bucket = process.env.AWS_BUCKET_NAME;

      const record = await this.imageService.create(
        userId,
        description,
        uuid,
        originalname
      );
      await this.s3.upload(bucket, fileBuffer, mimetype, filename);
      await transaction.commit();

      res.status(200).json({
        data: {
          success: true,
          id: record.id,
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
      const bucket = process.env.AWS_BUCKET_NAME;
      const filename = `${image.uuid}-${image.filename}`;
      const imagefile = await this.s3.get(bucket, filename);
      res.status(200).json({
        data: {
          imagefile,
        },
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };

  public getImageRecords = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const images = await this.imageService.getImageRecords();
      res.status(200).json({
        data: {
          images,
        },
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ImageController;
