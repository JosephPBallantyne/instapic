import aws from 'aws-sdk';

class S3 {
  public accessKeyId: string;

  public secretAccessKey: string;

  public apiVersion: string;

  public s3: aws.S3;

  constructor() {
    this.accessKeyId = process.env.AWS_IAM_USER_KEY;
    this.secretAccessKey = process.env.AWS_IAM_USER_SECRET;
    this.apiVersion = process.env.AWS_API_VERSION;
    this.s3 = new aws.S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      apiVersion: this.apiVersion,
    });
  }

  public upload = async (
    Bucket: string,
    stream: any,
    mimetype: string,
    filename: string
  ) => {
    try {
      await this.s3
        .putObject({
          Key: filename,
          Bucket,
          ContentType: mimetype,
          Body: stream,
          ACL: 'public-read',
        })
        .promise();
    } catch (err) {
      console.log('Error: ', err.stack);
      throw new Error();
    }
  };

  public get = async (Bucket: string, filename: string) => {
    try {
      return this.s3.getObject({ Bucket, Key: filename }).promise();
    } catch (err) {
      console.log('Error: ', err.stack);
      throw new Error();
    }
  };
}

export default S3;
