import users from "@/models/users";
import dbConnect from "@/utils/database";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await users.find({ record: { $exists: true, $not: {$size: 0} } });
        
        res.status(200).json({ success: true, data: data[0] })

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
