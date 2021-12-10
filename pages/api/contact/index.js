import contactInfo from '@/models/contact'
import dbConnect from '@/utils/database'

dbConnect();

const requestModHandler = async (req, res) => {
  const {
    method,
  } = req;


  switch (method) {

    case "GET":
      try {

        const data = await contactInfo.find({})
        res.status(200).json({ success: true, data: data })

      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
      }
      break;

    case "POST":
      try {
        const { name, phoneNumber, email, title, description } = req.body;

        const myRequest = {
          name, phoneNumber, email, title, description
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
