import recordRequest from "@/models/recordrequest";
import dbConnect from "@/utils/database";
import users from "@/models/users";
import cloudinary from 'cloudinary';
import { getSession } from "next-auth/react"


cloudinary.config({
  cloud_name: "keymaster123",
  api_key: "357121876529977",
  api_secret: "iFHdaY3pUNhl3Di1m-gS2KlrOVk"
});


dbConnect();

function recordChecker(prevTime, newTime) {
  if (prevTime < newTime) {
    return false;
  } else {
    return true;
  }
}

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  const session = await getSession({ req });
  const requestRecord = await recordRequest.findOne({ _id: id });

  if (session.user.isAdmin) {
    switch (method) {
      case "GET":
        try {
          res.status(200).json({ success: true, data: record });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;

      case "POST":
        try {
          const { approval } = req.body;

          await cloudinary.api.delete_resources(requestRecord.videoID,
            () => {}, { resource_type: "video" });

          const user = await users.findOne({
            _id: requestRecord.userID,
            "record.keymasterType": requestRecord.keymasterType,
          });
          let success = 0;

          if (!user && approval) {
            let newRecord = {
              keymasterType: requestRecord.keymasterType,
              time: requestRecord.time,
            };

            await users.updateOne(
              { _id: requestRecord.userID },
              { $push: { record: newRecord } }
            );
            await recordRequest.deleteOne({ _id: id });

            success = 1;
          } else if (user && approval) {
            let records = user.record;

            records.map(async (record, index) => {
              if (requestRecord.keymasterType == record.keymasterType) {
                if (recordChecker(record.time, requestRecord.time)) {
                  records[index].time = requestRecord.time;

                  await users.updateOne(
                    { _id: requestRecord.userID },
                    { $set: { record: records } }
                  );
                  await recordRequest.deleteOne({ _id: id });
                  success = 2;
                }
              }
            });
          } else {
            await recordRequest.deleteOne({ _id: id });
            success = 3;
          }

          if (success == 1) {
            res
              .status(200)
              .json({
                success: true,
                msg: "Amjilttai shineer record bairshuullaa",
              });
          } else if (success == 2) {
            res
              .status(200)
              .json({ success: true, msg: "Amjilttai record evdlee" });
          } else if (success == 3) {
            res.status(200).json({ success: true, msg: "Amjilttai ustgalaa" });
          } else {
            await recordRequest.deleteOne({ _id: id });
            res
              .status(205)
              .json({ success: false, msg: "Umnuh record iig evdsengue" });
          }

        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
    }

  } else {
    return res.status(401).json({ success: false, msg: "You dont have a access" });
  }
};

export default requestModHandler;
