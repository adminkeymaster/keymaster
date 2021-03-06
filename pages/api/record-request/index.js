import recordRequest from '@/models/recordrequest';
import dbConnect from '@/utils/database';
import formidable from 'formidable';
import user from '@/models/users';
import { getSession } from 'next-auth/react';

dbConnect();

const requestModHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });


  switch (method) {
    case 'GET':
      try {
        if (session.user.email) {
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
          
          res.status(200).json({ success: true, data: data });

        } else {
          return res.status(401).json({ success: false, msg: 'You dont have a access' });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {

        if (session.user.email) {

          const {
            userID,
            videoLink,
            videoID,
            keymasterType,
            time } = req.body;

          const newReq = {
            userID,
            videoLink,
            videoID,
            keymasterType,
            time
          };

          await recordRequest.create(newReq);
          return res.status(200).json({ success: true, msg: 'Successfully sent record request' });

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
