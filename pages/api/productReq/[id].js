import productReq from "@/models/productReq";
import dbConnect from "@/utils/database";

dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "POST":
      try {
        const { status } = req.body;
        await productReq.updateOne({ _id: id }, { status: status });
        res.status(200).json({ success: true, data: status });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
  }
};

export default requestModHandler;
