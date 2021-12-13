import users from '@/models/users'
import dbConnect from '@/utils/database'
import keymasterTypes from '@/models/keymasterTypes';
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

                const allKeymasterTypes = await keymasterTypes.find({});

                const userArray = await Promise.all(
                    data.map(async (user) => {
                        if (user.record.length) return user
                        else return;
                    })
                )
                const filteredUserArray = userArray.filter(user => {
                    return user !== undefined;
                })

                if (filteredUserArray.length)
                    return res.status(200).json({ success: true, data: filteredUserArray })
                else return res.status(200).json({ success: false, msg: "No such user found" })




            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break;

        case "POST":
            try {
                const { firstName, lastName, birthDate, gender, email, phoneNumber, password } = req.body;

                const user = await users.findOne({ email: email });
                if (user)
                    return res.status(200).json({ success: false, msg: "User already exist" });

                const hashedPass = await hashPassword(password);

                const myRequest = {
                    firstName, lastName, birthDate, gender, email, phoneNumber, password: hashedPass, photoLink: ""
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
