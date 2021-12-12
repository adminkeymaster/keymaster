import news from '@/models/news';
import dbConnect from '@/utils/database';
import { promises as fs } from 'fs';
import formidable from 'formidable';
import { getSession } from 'next-auth/react';

dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        const singleNews = await news.findOne({ _id: id });
        res.status(200).json({ success: true, data: singleNews });
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
          await news.updateOne({ _id: id }, myNews);
          res.status(200).json({ success: true, msg: 'Medeeg amjilttai soliloo' });
        } else {
          res.status(401).json({ succes: false, msg: 'You dont have access' });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        if (session.user.isAdmin) {
          await news.deleteOne({ _id: id });
          res.status(200).json({ success: true, msg: 'Successfully deleted' });
        } else {
          return res.status(401).json({ success: false, msg: 'You dont have a access' });
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
