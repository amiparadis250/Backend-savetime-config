import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

interface CloudinaryResponse {
  secure_url: string;
  
}

const uploadImage = async (ImageData: Buffer): Promise<CloudinaryResponse> => {
  const base64Image = ImageData.toString("base64");
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      { public_id: "user_image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (!result) {
            reject(new Error("No result from Cloudinary"));
            return;
          }
          resolve(result);
        }
      }
    );
  });
};

export default uploadImage;