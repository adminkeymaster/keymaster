import dbConnect from '@/utils/database'
import contactInfo from '@/models/contact'
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
                if (session.user.isAdmin) {
                    const contact = await contactInfo.findOne({ _id: id });
                    res.status(200).json({ success: true, data: contact });
                } else {
                    return res.status(401).json({ success: false, msg: "You dont have a access" });
                }

            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
};

export default requestModHandler;
