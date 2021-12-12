import product from "@/models/products";
import dbConnect from "@/utils/database";
import { promises as fs } from "fs";
import formidable from "formidable";
import { getSession } from "next-auth/react"

dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  const session = await getSession({ req });
  
  switch (method) {
    case "GET":
      try {
        const singleProduct = await product.findOne({ _id: id });
        res.status(200).json({ success: true, data: singleProduct });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {


        if (session.user.isAdmin) {

          const form = new formidable.IncomingForm({ keepExtensions: true });

          const formParsePhotoSuccess = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
              if (err) {
                reject(err);
                return;
              }
              const dateNow = new Date();
              let productInfo = {
                fields,
              };

              if (files.photoUpload) {
                productInfo.oldpath = files.photoUpload.filepath;
                productInfo.link = `/assets/images/products/${dateNow.getTime()}-${files.photoUpload.originalFilename
                  }`;
                productInfo.newpath = `./public/assets/images/products/${dateNow.getTime()}-${files.photoUpload.originalFilename
                  }`;
              } else {
                await product.updateOne(
                  { _id: id },
                  {
                    productName: fields.productName,
                    color: fields.color,
                    hexColor: fields.hexColor,
                    type: fields.type,
                    productPrice: fields.productPrice,
                  }
                );
                return res
                  .status(200)
                  .json({ success: true, msg: "amjilttai edit hiile" });
              }

              resolve(productInfo);
            });
          }).then(async (productInfo) => {
            let isSuccess = false;

            await fs
              .rename(productInfo.oldpath, productInfo.newpath, (err) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
              })
              .then(async () => {
                isSuccess = true;

                const newProduct = {
                  productName: productInfo.fields.productName,
                  color: productInfo.fields.color,
                  hexColor: productInfo.fields.hexColor,
                  type: productInfo.fields.type,
                  photoLink: productInfo.link,
                  productPrice: productInfo.fields.productPrice,
                };
                await product.updateOne({ _id: id }, newProduct);
              });

            return isSuccess;
          });

          if (formParsePhotoSuccess) {
            return res
              .status(200)
              .json({ success: true, msg: "Successfully added a new product" });
          } else {
            return res
              .status(200)
              .json({ success: false, msg: "Error adding product" });
          }

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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default requestModHandler;
