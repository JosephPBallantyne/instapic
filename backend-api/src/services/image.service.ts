/* eslint-disable class-methods-use-this */
import HttpException from '../exceptions/HttpException';
import ImageModel from '../db/models/images.model';
import UserModel from '../db/models/users.model';
import { Image } from '../types/image.type';

class ImageService {
  public imageModel = ImageModel;

  public async create(
    userId: number,
    description: string = '',
    uuid: string,
    filename: string
  ): Promise<any> {
    const image: ImageModel = await this.imageModel.create({
      description,
      uuid,
      filename,
      userId,
    });
    if (!image) {
      throw new HttpException(400, 'Unable to create image');
    }
    return image.toJSON() as Image;
  }

  public async getImage(imageId: number): Promise<any> {
    const image: ImageModel = await this.imageModel.findOne({
      where: { id: imageId },
    });
    if (!image) {
      throw new HttpException(400, 'Unable to find image');
    }
    return image.toJSON() as Image;
  }

  public async getImageRecords(): Promise<any> {
    const results: ImageModel[] = await this.imageModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ['username'],
        },
      ],
    });
    if (!results) {
      throw new HttpException(400, 'Unable to find images');
    }
    const images = results.map((result) => {
      const image = result.toJSON();
      return image;
    });
    return images || [];
  }
}

export default ImageService;
