import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'quickCredit',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 150, height: 150, crop: 'limit' }],
});
const uploads = multer({ storage });

export default uploads;
