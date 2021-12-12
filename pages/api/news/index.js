import { promises as fs } from "fs";
import formidable from "formidable";
import news from "@/models/news";
import dbConnect from "@/utils/database";
import { getSession } from "next-auth/react"

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req })


  switch (method) {
    case "GET":
      try {
        const data = await news.find({});
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        if (session.user.isAdmin) {


          const { photoLink, title, description } = req.body;
          const myNews = {
            photoLink, title, description
          }
          await news.create(myNews)
          res.status(201).json({ success: true, msg: "Amjilttai medee nemlee" });
















          const form = new formidable.IncomingForm({ keepExtensions: true });

          const formParsePhotoSuccess = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
              if (err) {
                reject(err);
                return;
              }

              const dateNow = new Date();

              const newsInfo = {
                fields,
                oldpath: files.photoUpload.filepath,
                link: `/assets/images/news/${dateNow.getTime()}-${files.photoUpload.originalFilename
                  }`,
                newpath: `./public/assets/images/news/${dateNow.getTime()}-${files.photoUpload.originalFilename
                  }`,
              };

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

                console.log(myNews);

                await news.create(myNews);
              });

            return isSuccess;
          });

          if (formParsePhotoSuccess) {
            return res
              .status(200)
              .json({ success: true, msg: "Successfully published news" });
          } else {
            return res
              .status(200)
              .json({ success: false, msg: "Error publishing news" });
          }

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
