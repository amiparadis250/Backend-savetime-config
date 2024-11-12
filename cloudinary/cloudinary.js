import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});


const uploadImage = async (imageData) => {
    // Convert the image buffer to a base64-encoded string
    const base64Image = imageData.buffer.toString("base64"); // Use buffer instead of .toString directly
    const mimeType = imageData.mimetype; // Get the mime type from the uploaded file (e.g., 'image/png')
  
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`, 
        { public_id: "user_image" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (!result) {
              reject(new Error("No result from Cloudinary"));
              return;
            }
            resolve(result.secure_url); 
          }
        }
      );
    });
  };

const uploadPDF = async (pdfData) => {
    const base64PDF = pdfData.buffer.toString("base64");
  
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:application/pdf;base64,${base64PDF}`,
        {
          public_id: "user_pdf",
          resource_type: "raw",
          content_type: "application/pdf"
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading PDF to Cloudinary:", error);
            reject(error);
          } else {
            if (!result) {
              reject(new Error("No result from Cloudinary"));
              return;
            }
  
            const secureUrl = `${result.secure_url}.pdf`; 
            const downloadUrl = `${secureUrl.replace("upload/", "upload/fl_attachment/")}`;
            const previewUrl = `${secureUrl}#toolbar=0`;
  
            const response = {
              secure_url: secureUrl,
              download_url: downloadUrl,
              preview_url: previewUrl
            };
  
            resolve(response);
          }
        }
      );
    });
  };
  
  

export { uploadImage, uploadPDF };
