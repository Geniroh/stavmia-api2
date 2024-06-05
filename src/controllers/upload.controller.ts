import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import Filez from '../models/filez.model';
import Innovation from '../models/innovations.model';

dotenv.config();

const s3Client = new S3Client({
  region: 'nyc3',
  endpoint: "https://nyc3.digitaloceanspaces.com",
  credentials: {
    accessKeyId: process.env.DO_SPACE_KEY!,
    secretAccessKey: process.env.DO_SPACE_SECRET!
  }
});

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const { originalname, buffer, size } = req.file;

  const bucketName = process.env.DO_BUCKET_NAME;

  if (!bucketName) {
    res.status(500).send('Bucket name not defined.');
    return;
  }

  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: originalname,
    Body: buffer,
    ACL: 'public-read'
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    const fileRecord = {
      filename: originalname,
      size: size.toString(),
      url: `https://${bucketName}.${process.env.DO_ENDPOINT}/${originalname}`,
      uploadedAt: new Date()
    };

    await Filez.create(fileRecord);

    // https://stavmia-backend-bucket.nyc3.cdn.digitaloceanspaces.com/6678.jpg

    res.status(200).send({
      message: 'File uploaded successfully',
      url: fileRecord.url
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
};

const testUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const newInnovation = await Innovation.create(req.body);
    res.status(201).json(newInnovation);
  } catch (error) {
    console.log(error)
  }
}

export { uploadFile, testUpload };



// import { Request, Response } from 'express';
// import Innovation, { IInnovation } from '../models/innovations.model';
// import { uploadFile } from './upload.controller';

// // Handler for creating a new innovation
// const createInnovation = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Call the uploadFile middleware to upload the media file
//     await uploadFile(req, res);

//     // Extract information from the request payload
//     const { product_name, year_invented, country, cost, product_chain, product_phase, product_use, product_description, is_example } = req.body;
//     const mediaUrl = req.body.fileUrl; // Assuming the uploadFile middleware sets this value

//     // Create a new innovation document with the extracted information
//     const newInnovation: IInnovation = await Innovation.create({
//       product_name,
//       year_invented,
//       country,
//       cost,
//       product_chain,
//       product_phase,
//       product_use,
//       product_description,
//       is_example,
//       product_media: [{ file_name: "media", file_path: mediaUrl }] // Assuming "file_name" is constant for all media files
//     });

//     // Send the created innovation document in the response
//     res.status(201).json(newInnovation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error creating innovation');
//   }
// };

// export { createInnovation };
