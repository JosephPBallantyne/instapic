/* eslint-disable class-methods-use-this */
import ImageModel from '../db/models/images.model';

class ImageService {
  public imageModel = ImageModel;

  public async upload(): Promise<any> {
    console.log('uploading image');
  }

  public async getImage(imageId: number): Promise<any> {
    const image: ImageModel = await this.imageModel.findOne({
      where: { id: imageId },
    });
    console.log('image: ', image);
  }
}

export default ImageService;
