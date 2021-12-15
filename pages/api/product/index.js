import product from "@/models/products";
import dbConnect from "@/utils/database";
import { promises as fs } from "fs";
import formidable from "formidable";
import { getSession } from "next-auth/react";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      try {

        const data = await product.find({});
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        if (!session.user.isAdmin) {
          return res.status(403).json({
            success: false,
            message: "You are not authorized to access this page",
          });
        }
        const { productName,
          productPrice,
          hexColor,
          type,
          description,
          photoLinks,
          photoIDs
        } = req.body;

        const myProduct = {
          productName,
          productPrice,
          hexColor,
          type,
          description,
          photoLinks,
          photoIDs
        }

        await product.create(myProduct);
        res.status(200).json({ success: true });

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
