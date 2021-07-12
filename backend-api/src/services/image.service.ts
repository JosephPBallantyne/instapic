/* eslint-disable class-methods-use-this */
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
    return image.toJSON() as Image;
  }

  public async getImage(imageId: number): Promise<any> {
    const image: ImageModel = await this.imageModel.findOne({
      where: { id: imageId },
    });
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
    const images = results.map((result) => {
      const image = result.toJSON();
      return image;
    });
    return images || [];
  }
}

export default ImageService;
