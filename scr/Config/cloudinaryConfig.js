const cloudinary = require('cloudinary').v2;

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nombre de la nube
     api_key: process.env.CLOUDINARY_API_KEY, // Tu API key
     api_secret: process.env.CLOUDINARY_API_SECRET, // Tu API secret
   });

   module.exports = cloudinary;
