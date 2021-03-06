import product from "@/models/products";
import dbConnect from "@/utils/database";
import { promises as fs } from "fs";
import formidable from "formidable";
import { getSession } from "next-auth/react"
import cloudinary from 'cloudinary';
// const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: "keymaster123",
  api_key: "357121876529977",
  api_secret: "iFHdaY3pUNhl3Di1m-gS2KlrOVk"
});


dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  const session = await getSession({ req });
  const singleProduct = await product.findOne({ _id: id });


  switch (method) {
    case "GET":
      try {
        res.status(200).json({ success: true, data: singleProduct });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {


        if (session.user.isAdmin) {

          const { productName,
            productPrice,
            hexColor,
            type,
            description,
            photoLinks,
            photoIDs
          } = req.body;

          let myProduct = {
            productName,
            productPrice,
            hexColor,
            type,
            description,
          }

          if (photoIDs && photoLinks) {
            singleProduct.photoIDs.map(async (singlePhoto) => {
              await cloudinary.uploader.destroy(singlePhoto)
            })
            myProduct.photoIDs = photoIDs;
            myProduct.photoLinks = photoLinks;
          }         

          await product.updateOne({ _id: id }, myProduct)
          res.status(200).json({ success: true })

        } else {
          return res.status(401).json({ success: false, msg: "You dont have a access" });
        }


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {

        if (session.user.isAdmin) {
          singleProduct.photoIDs.map(async (singlePhoto) => {
            await cloudinary.uploader.destroy(singlePhoto)
          })

          await product.deleteOne({ _id: id });

          res.status(200).json({ success: true, msg: "Successfully deleted" });
        } else {
          return res.status(401).json({ success: false, msg: "You dont have a access" });
        }


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default requestModHandler;
