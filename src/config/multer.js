// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName); 
//   }
// });

// export const upload = multer({ storage });


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dfzpyl4bi',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  
  params: async (req, file) => {
    console.log('hereeee');
    let folder = '';
    if (file.fieldname === 'coverImage') {
      folder = 'coverImage';
    } else if (file.fieldname === 'optionalImage') {
      folder = 'optionalImage';
    }

    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png'],
    };
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (e.g., 5MB)
  fileFilter: (req, file, cb) => {
    // Check file types, here you can allow only image formats
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Not an image! Please upload an image file.'), false); // Reject the file
    }
  }
})


export default upload;




