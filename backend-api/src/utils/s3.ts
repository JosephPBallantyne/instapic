import aws from 'aws-sdk';

const accessKeyId = process.env.AWS_IAM_USER_KEY;
const secretAccessKey = process.env.AWS_IAM_USER_SECRET;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
  apiVersion: '2006-03-01',
});

const Uploader = async (
  Bucket: string,
  stream: any,
  mimetype: string,
  filename: string
) => {
  try {
    await s3
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

export default Uploader;
