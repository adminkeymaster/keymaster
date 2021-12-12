import news from "@/models/news";
import dbConnect from "@/utils/database";
import { promises as fs } from "fs";
import formidable from "formidable";
import { getSession } from "next-auth/react"


dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  const session = await getSession({ req })

  switch (method) {
    case "GET":
      try {
        const singleNews = await news.findOne({ _id: id });
        res.status(200).json({ success: true, data: singleNews });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {


        if (session.user.isAdmin) {
          const form = new formidable.IncomingForm({ keepExtensions: true });

          const formParsePhotoSuccess = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
              if (err) {
                reject(err);
                return;
              }

              const newsInfo = {
                fields,
              };

              const dateNow = new Date();

              if (files.photoUpload) {
                newsInfo.oldpath = files.photoUpload.filepath;
                newsInfo.link = `/assets/images/news/${dateNow.getTime()}-${files.photoUpload.originalFilename
                  }`;
                newsInfo.newpath = `./public/assets/images/news/${dateNow.getTime()}-${files.photoUpload.originalFilename
                  }`;
              } else {
                await news.updateOne(
                  { _id: id },
                  {
                    date: dateNow,
                    title: fields.title,
                    description: fields.description,
                  }
                );
                return res
                  .status(200)
                  .json({ success: true, msg: "amjilttai edit hiile" });
              }

              resolve(newsInfo);
            });
          }).then(async (newsInfo) => {
            let isSuccess = false;

            await fs
              .rename(newsInfo.oldpath, newsInfo.newpath, (err) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
              })
              .then(async () => {
                isSuccess = true;

                const myNews = {
                  date: new Date(),
                  title: newsInfo.fields.title,
                  description: newsInfo.fields.description,
                  photoLink: newsInfo.link,
                };

                await news.updateOne({ _id: id }, myNews);
              });

            return isSuccess;
          });

          if (formParsePhotoSuccess) {
            return res
              .status(200)
              .json({ success: true, msg: "Successfully edited news" });
          } else {
            return res
              .status(200)
              .json({ success: false, msg: "Error editing news" });
          }
        } else {
          return res.status(401).json({ success: false, msg: "You dont have a access" });
        }


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        if (session.user.isAdmin) {
          await news.deleteOne({ _id: id });
          res.status(200).json({ success: true, msg: "Successfully deleted" });
        } else {
          return res.status(401).json({ success: false, msg: "You dont have a access" });
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
