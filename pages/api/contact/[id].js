import dbConnect from '@/utils/database'
import contactInfo from '@/models/contact'

dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    switch (method) {
        case "GET":
            try {
                const contact = await contactInfo.findOne({ _id: id });
                res.status(200).json({ success: true, data: contact });

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
