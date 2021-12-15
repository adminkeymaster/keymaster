import dbConnect from '@/utils/database'
import users from '@/models/users'

dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
        query: {id},
    } = req;

    switch (method) {    

        case "POST":
            try{
                const { description } = req.body;
                await users.updateOne({ _id: id }, { $push: { lastComp: {description: description} } });
                return res.status(200).json({ success: true, data: description })

            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
    }
};

export default requestModHandler;
