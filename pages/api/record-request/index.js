import recordRequest from "@/models/recordrequest";
import dbConnect from "@/utils/database";
import { promises as fs } from "fs";
import formidable from "formidable";
import user from "@/models/users";

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const recordRequests = await recordRequest.find({}).lean();

        const data = await Promise.all(
          recordRequests.map(async (recordRequest) => {

            const tempUser = await user.findById(
              recordRequest.userID,
              "firstName lastName birthDate gender"
            ).lean()

            return {
              ...tempUser,
              ...recordRequest
              
            };
          })

        )

        console.log(data);

        res.status(200).json({ success: true, data: data });

      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const form = new formidable.IncomingForm({ keepExtensions: true });

        const formParseVideoSuccess = await new Promise((resolve, reject) => {
          form.parse(req, async (err, fields, files) => {

            if (err) {
              reject(err);
              return;
            }

            const dateNow = new Date();

            const myForm = {
              fields,
              oldpath: files.videoUpload.filepath,
              link: `/assets/videos/records/${dateNow.getTime()}-${files.videoUpload.originalFilename
                }`,
              newpath: `./public/assets/videos/records/${dateNow.getTime()}-${files.videoUpload.originalFilename
                }`,
            };

            resolve(myForm);
            
          })
        }).then(async (myForm) => {
          let isSuccess = false;

          await fs.rename(myForm.oldpath, myForm.newpath, (err) => {
            if (err) {
              console.log(err)
              throw err;
            }
          }).then(async () => {

            const newReq = {
              userID: myForm.fields.userID,
              videoLink: myForm.link,
              keymasterType: myForm.fields.keymasterType,
              time: myForm.fields.time
            }

            isSuccess = true;
            await recordRequest.create(newReq);
          });

          return isSuccess;
        });



        if (formParseVideoSuccess) {
          return res.status(200).json({ success: true, msg: "Successfully sent record request" });
        } else {
          return res.status(200).json({ success: false, msg: "Error occured while uploading files" });
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default requestModHandler;
