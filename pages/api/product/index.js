import product from '@/models/products';
import dbConnect from '@/utils/database';
import { promises as fs } from "fs";
import formidable from "formidable";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await product.find({});
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const form = new formidable.IncomingForm({ keepExtensions: true });

        const formParsePhotoSuccess = await new Promise((resolve, reject) => {
          form.parse(req, async (err, fields, files) => {

            if (err) {
              reject(err);
              return;
            }

            const dateNow = new Date();

            const productInfo = {
              fields,
              oldpath: files.photoUpload.filepath,
              link: `/assets/images/products/${dateNow.getTime()}-${files.photoUpload.originalFilename
                }`,
              newpath: `./public/assets/images/products/${dateNow.getTime()}-${files.photoUpload.originalFilename
                }`,
            };

            resolve(productInfo);
          })
        }).then(async (productInfo) => {
          let isSuccess = false;

          await fs.rename(productInfo.oldpath, productInfo.newpath, (err) => {
            if (err) {
              console.log(err)
              throw err;
            }
          }).then(async () => {

            isSuccess = true;

            const newProduct = {
              productName: productInfo.fields.productName,
              color: productInfo.fields.color,
              hexColor: productInfo.fields.hexColor,
              type: productInfo.fields.type,
              photoLink: productInfo.link,
              productPrice: productInfo.fields.productPrice,
            };
            await product.create(newProduct);
          });

          return isSuccess;
        });

        if (formParsePhotoSuccess) {
          return res.status(200).json({ success: true, msg: "Successfully added a new product" });
        } else {
          return res.status(200).json({ success: false, msg: "Error adding product" });
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
