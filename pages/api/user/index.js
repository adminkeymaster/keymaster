import users from '@/models/users'
import ageGroup from '@/models/ageGroup'
import dbConnect from '@/utils/database'
import { hashPassword } from "@/utils/auth";


dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
    } = req;


    switch (method) {

        case "GET":
            try {
                const data = await users.find({})
                res.status(200).json({ success: true, data: data })

            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break;

        case "POST":
            try {
                const { firstName, lastName, birthDate, gender, email, phoneNumber, password } = req.body;

                const user = await users.findOne({ email: email });
                console.log(user);
                if (user) 
                    return res.status(200).json({ success: false, msg: "User already exist" });
                
                const hashedPass = await hashPassword(password);

                const myRequest = {
                    firstName, lastName, birthDate, gender, email, phoneNumber, password: hashedPass
                };

                await users.create(myRequest);
                res.status(201).json({ success: true, message: myRequest });

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
