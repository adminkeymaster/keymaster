import dbConnect from "@/utils/database";
import users from "@/models/users";
import { getSession } from "next-auth/react";
import { hashPassword } from "@/utils/auth";
import cloudinary from 'cloudinary';

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
  const user = await users.findOne({ _id: id });

  if (session.user.email) {
    switch (method) {
      case "GET":
        try {
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;

      case "POST":
        try {
          const {
            firstName,
            lastName,
            photoLink,
            photoID,
            email,
            phoneNumber,
            password,
          } = req.body;

          if (photoLink && photoID && user.photoLink) {
            await cloudinary.uploader.destroy(user.photoID);
          }

          const hashedPass = await hashPassword(password);
          const myUser = {
            firstName,
            lastName,
            email,
            phoneNumber,
            photoLink,
            photoID,
            password: hashedPass,
          };

  
          await users.updateOne({ _id: id }, myUser);
          res
            .status(200)
            .json({ success: true, msg: "Medeeg amjilttai soliloo" });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    return res
      .status(401)
      .json({ success: false, msg: "You dont have a access" });
  }
};

export default requestModHandler;
