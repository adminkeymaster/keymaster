import product from "@/models/products";
import productReq from "@/models/productReq";
import dbConnect from "@/utils/database";
import { getSession } from "next-auth/react"


dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req })


  switch (method) {
    case "GET":
      try {
        if (session.user.isAdmin) {
          const productRequests = await productReq.find({}).lean();

          const data = await Promise.all(
            productRequests.map(async (productRequest) => {
              const mergedProductInfo = await Promise.all(
                productRequest.productInfo.map(async (productInfo) => {
                  const tempProduct = await product
                    .findById(
                      productInfo.productID,
                      "productName color productPrice type hexColor"
                    )
                    .lean();

                  return {
                    ...productInfo,
                    ...tempProduct,
                  };
                })
              );

              productRequest.productInfo = mergedProductInfo;

              return productRequest;
            })
          );

          res.status(200).json({ success: true, data: data });
        } else {
          return res.status(401).json({ success: false, msg: "You dont have a access" });
        }


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { productInfo, email, phoneNumber, firstName, lastName } =
          req.body;

        const status = false;

        const myRequest = {
          firstName,
          lastName,
          email,
          phoneNumber,
          productInfo,
          status
        };

        await productReq.create(myRequest);
        res.status(201).json({ success: true, message: "created" });
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
