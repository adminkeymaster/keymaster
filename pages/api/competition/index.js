import competition from "@/models/competition";
import dbConnect from "@/utils/database";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const id = "61b1b1dbca5fa2498b203074";
  const mongoose = require('mongoose');

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
        const { endDate, startDate, description, location, newsLink, compID } = req.body;
        const myComp = {
          endDate, startDate, description, location, newsLink
        }

        if (compID) {

          const compID_object = mongoose.Types.ObjectId(compID);
          await competition.update(
            {
              'competitions._id': compID_object
            },
            {
              $set: {
                'competitions.$.endDate': endDate,
                'competitions.$.startDate': startDate,
                'competitions.$.description': description,
                'competitions.$.location': location,
                'competitions.$.newsLink': newsLink,
              }
            }
          )
          return res.status(200).json({ success: true, msg: "edit hiiv" })

        } else {
          console.log("bti hii gesn ymudeo")
          await competition.updateOne(
            { _id: id },
            {
              $push: {
                competitions: myComp

              }
            })
          return res.status(200).json({ success: true, msg: "amjilttai temtseen nemlee" })

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
