import users from "@/models/users";
import dbConnect from "@/utils/database";
import keymasterTypes from "@/models/keymasterTypes";
import { hashPassword } from "@/utils/auth";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await users.find({});

          return res
            .status(200)
            .json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

  }
};

export default requestModHandler;