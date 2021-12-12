import ageGroup from '@/models/ageGroup'
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
                const data = await ageGroup.find({})
                res.status(200).json({ success: true, data: data })

            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break;

        case "POST":
            try {

                if (session.user.isAdmin) {
                    const { age } = req.body;

                    if (!age) return res.status(200).json({ success: false, msg: "Missing age variable" });

                    const tempAgeGroup = await ageGroup.findOne({ age: age });
                    if (tempAgeGroup)
                        return res.status(200).json({ success: false, msg: "ageGroup already exists" });

                    await ageGroup.create({ age });
                    res.status(201).json({ success: true, message: 'created' });
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

export default requestModHandler;
