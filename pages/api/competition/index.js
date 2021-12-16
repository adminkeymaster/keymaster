import competition from "@/models/competition";
import dbConnect from "@/utils/database";
import { getSession } from "next-auth/react";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const id = "61b1b1dbca5fa2498b203074";
  const mongoose = require("mongoose");
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
        console.log(req);

        if (session.user.isAdmin) {
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
          compID,
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

        if (compID) {
          const compID_object = mongoose.Types.ObjectId(compID);
          await competition.updateOne(
            {
              "competitions._id": compID_object,
            },
            {
              $set: {
                "competitions.$.endDate": endDate,
                "competitions.$.startDate": startDate,
                "competitions.$.description": description,
                "competitions.$.location": location,
                "competitions.$.newsLink": newsLink,
                "competitions.$.compName": compName,
                "competitions.$.ageGroup": ageGroup,
                "competitions.$.type": type,
              },
            }
          );
          return res.status(200).json({ success: true, msg: "edit hiiv" });
        } else {
          await competition.updateOne(
            { _id: id },
            {
              $push: {
                competitions: myComp,
              },
            }
          );
          return res
            .status(200)
            .json({ success: true, msg: "amjilttai temtseen nemlee" });
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
