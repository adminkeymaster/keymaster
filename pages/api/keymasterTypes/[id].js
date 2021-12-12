import dbConnect from '@/utils/database'
import keymasterTypes from '@/models/keymasterTypes'
import { getSession } from "next-auth/react"

dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;
    const session = await getSession({ req })


    switch (method) {
        case "GET":
            try {
                const data = await keymasterTypes.findOne({ _id: id });
                res.status(200).json({ success: true, data: data });

            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break;

        case "POST":
            try {


                if (session.user.isAdmin) {
                    const { keymasterType } = req.body;
                    await keymasterTypes.updateOne({ _id: id }, { keymasterType: keymasterType })
                    res.status(200).json({ success: true, data: keymasterType })
                } else {
                    return res.status(401).json({ success: false, msg: "You dont have a access" });
                }



            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false })
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
};

export default requestModHandler;
