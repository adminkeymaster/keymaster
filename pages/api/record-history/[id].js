import dbConnect from '@/utils/database'
import users from '@/models/users'
import competition from '@/models/competition'
import { getSession } from "next-auth/react"


dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;
    const session = await getSession({ req });
    if (!session.user.isAdmin) {
        return res.status(401).json({ success: false, msg: "You dont have a access" });

    }
    switch (method) {

        case "POST":
            try {
                const { compID } = req.body;

                if (compID) {

                    await users.updateOne({ _id: id }, { $pull: { lastComp: { _id: compID } } });
                    return res.status(200).json({ success: true })

                } else {
                    const { compName, type, ageGroup, record } = req.body;
                    const myComp = {
                        compName, type, ageGroup, record
                    }

                    await users.updateOne({ _id: id }, { $push: { lastComp: myComp } });
                    return res.status(200).json({ success: true, data: myComp })
                }

            }

            catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;


        default:
            res.status(400).json({ success: false })
            break;
    }






};

export default requestModHandler;
