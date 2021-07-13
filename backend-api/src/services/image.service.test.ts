/* eslint-disable jest/no-conditional-expect */
import ImageService from './image.service';
import ImageModel from '../db/models/images.model';

const imageData = {
  userId: 1,
  description: 'description',
  uuid: 'uuid',
  filename: 'filename',
};
const imageId = 2;
const mockedImageModel = ImageModel as jest.Mocked<any>;

describe('Unit Test: Image Service', () => {
  let imageService: ImageService;

  beforeAll(async () => {
    imageService = new ImageService();
  });
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('creates image record', async () => {
      expect.assertions(1);
      const mockedImage = {
        ...imageData,
        toJSON: jest.fn(() => {
          return imageData;
        }),
      };
      jest.spyOn(mockedImageModel, 'create').mockResolvedValueOnce(mockedImage);
      const res = await imageService.create(
        imageData.userId,
        imageData.description,
        imageData.uuid,
        imageData.filename
      );
      expect(res).toEqual(imageData);
    });
    it('does not create image', async () => {
      expect.assertions(1);
      jest.spyOn(mockedImageModel, 'create').mockResolvedValueOnce(undefined);

      return imageService
        .create(
          imageData.userId,
          imageData.description,
          imageData.uuid,
          imageData.filename
        )
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
  });

  describe('get image', () => {
    it('gets image', async () => {
      expect.assertions(1);
      const mockedImage = {
        ...imageData,
        toJSON: jest.fn(() => {
          return imageData;
        }),
      };
      jest
        .spyOn(mockedImageModel, 'findOne')
        .mockResolvedValueOnce(mockedImage);
      const res = await imageService.getImage(imageId);
      expect(res).toEqual(imageData);
    });
    it('does not get image', async () => {
      expect.assertions(1);
      jest.spyOn(mockedImageModel, 'findOne').mockResolvedValueOnce(undefined);

      return imageService
        .getImage(imageId)
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
  });

  describe('get image records', () => {
    it('gets image records', async () => {
      expect.assertions(1);
      const mockedImage = {
        ...imageData,
        toJSON: jest.fn(() => {
          return imageData;
        }),
      };
      jest
        .spyOn(mockedImageModel, 'findAll')
        .mockResolvedValueOnce([mockedImage]);
      const res = await imageService.getImageRecords();
      expect(res).toEqual([imageData]);
    });
    it('does not create image', async () => {
      expect.assertions(1);
      jest.spyOn(mockedImageModel, 'findAll').mockResolvedValueOnce(undefined);
      return imageService
        .getImageRecords()
        .catch((e) => expect(e).toEqual(expect.any(Error)));
    });
  });
});
