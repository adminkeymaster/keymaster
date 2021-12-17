import competition from "@/models/competition";
import dbConnect from "@/utils/database";
import { getSession } from "next-auth/react";

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
        const data = await competition.findOne({ _id: id });
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        console.log(req.body);

        if (!session.user.isAdmin) {
          return res
            .status(401)
            .json({ success: false, msg: "You dont have a access" });
        }

        const {
          compName,
          ageGroup,
          type,
          endDate,
          startDate,
          description,
          location,
          newsLink,
        } = req.body;

        const myComp = {
          endDate,
          startDate,
          description,
          location,
          newsLink,
          compName,
          ageGroup,
          type,
        };

        await competition.updateOne({ _id: id }, myComp);
        res
          .status(200)
          .json({ success: true, msg: "amjilttai temtseenii medeelel solilo" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        if (session.user.isAdmin) {
          await competition.deleteOne({ _id: id });
          return res
            .status(200)
            .json({ success: true, msg: "Amjilttai ustgalaa" });
        } else {
          return res
            .status(401)
            .json({ success: false, msg: "You dont have a access" });
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
