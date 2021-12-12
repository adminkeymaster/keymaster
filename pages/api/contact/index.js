import contactInfo from '@/models/contact'
import dbConnect from '@/utils/database'
import { getSession } from "next-auth/react"

dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
  } = req;
  const session = await getSession({ req })


  switch (method) {

    case "GET":
      try {
        if (session.user.isAdmin) {


          const data = await contactInfo.find({})
          res.status(200).json({ success: true, data: data })
        } else {
          return res.status(401).json({ success: false, msg: "You dont have a access" });
        }

      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
      }
      break;

    case "POST":
      try {





        const { firstName, lastName, phoneNumber, email, description } = req.body;

        const myRequest = {
          firstName, lastName, phoneNumber, email, description
        };

        await contactInfo.create(myRequest);
        res.status(201).json({ success: true, message: 'created' });







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
