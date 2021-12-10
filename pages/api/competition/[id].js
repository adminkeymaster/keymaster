import { promises as fs } from "fs";
import formidable from "formidable";
import competition from "@/models/competition";
import dbConnect from "@/utils/database";

dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  const docID = "61b1b1dbca5fa2498b203074";


  switch (method) {

    case "POST":
      try {

        const form = new formidable.IncomingForm({ keepExtensions: true });

        const formParsePhotoSuccess = await new Promise((resolve, reject) => {
          form.parse(req, async (err, fields, files) => {

            if (err) {
              reject(err);
              return;
            }
            console.log(fields);
            let compInfo = {
              fields
            };
            const dateNow = new Date();

            if (files.photoUpload) {
              compInfo.oldpath = files.photoUpload.filepath;
              compInfo.link = `/assets/images/competition/${dateNow.getTime()}-${files.photoUpload.originalFilename
                }`;
              compInfo.newpath = `./public/assets/images/competition/${dateNow.getTime()}-${files.photoUpload.originalFilename
                }`;
            } else {
              await competition.updateOne({ _id: docID },
                {
                  htmlText: fields.htmlText
                })
              return res.status(200).json({ success: true, msg: "amjilttai edit hiile" })
            }

            resolve(compInfo);
          })
        }).then(async (compInfo) => {
          let isSuccess = false;

          await fs.rename(compInfo.oldpath, compInfo.newpath, (err) => {
            if (err) {
              console.log(err)
              throw err;
            }
          }).then(async () => {

            isSuccess = true;
            await competition.updateOne({ _id: docID }, { htmlText: compInfo.fields.htmlText, photoLink: compInfo.link });
          });

          return isSuccess;
        });

        if (formParsePhotoSuccess) {
          return res.status(200).json({ success: true, msg: "Successfully edited comp" });
        } else {
          return res.status(200).json({ success: false, msg: "Error editing comp" });
        }



      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;

    case "DELETE":
      try {
        
        await competition.updateOne(
          { _id: docID },
          { $pull: { competitions: { _id: id } } }
        );
        res.status(200).json({ success: true, msg: "Amjilttai ustgalaa" });


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
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
