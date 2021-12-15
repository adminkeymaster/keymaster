import recordRequest from '@/models/recordrequest';
import dbConnect from '@/utils/database';
import { promises as fs } from 'fs';
import formidable from 'formidable';
import user from '@/models/users';
import { getSession } from 'next-auth/react';

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  if (session.user.email) {
    switch (method) {
      case 'GET':
        try {
          const recordRequests = await recordRequest.find({}).lean();

          const data = await Promise.all(
            recordRequests.map(async (recordRequest) => {
              const tempUser = await user.findById(recordRequest.userID, 'firstName lastName birthDate gender').lean();

              return {
                ...tempUser,
                ...recordRequest,
              };
            })
          );

          console.log(data);

          res.status(200).json({ success: true, data: data });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;

      case 'POST':
        try {
          const form = new formidable.IncomingForm({ keepExtensions: true });

          form.parse(req, async (err, fields, files) => {
            if (err) {
              reject(err);
              return;
            }

            const newReq = {
              userID: fields.userID,
              videoLink: fields.videoLink,
              keymasterType: fields.keymasterType,
              time: fields.time,
            };

            await recordRequest.create(newReq);
            return res.status(200).json({ success: true, msg: 'Successfully sent record request' });
          });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    return res.status(401).json({ success: false, msg: 'You dont have a access' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default requestModHandler;
