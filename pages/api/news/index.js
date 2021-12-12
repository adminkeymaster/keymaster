import { promises as fs } from 'fs';
import formidable from 'formidable';
import news from '@/models/news';
import dbConnect from '@/utils/database';
import { getSession } from 'next-auth/react';

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        const data = await news.find({});
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        if (session.user.isAdmin) {
          const { photoLink, title, description } = req.body;
          const myNews = {
            photoLink,
            title,
            description,
            date: new Date(),
          };
          await news.create(myNews);
          res.status(201).json({ success: true, msg: 'Amjilttai medee nemlee' });
        } else {
          res.status(401).json({ succes: false, msg: 'You dont have access' });
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
