import keymasterTypes from '@/models/keymasterTypes'
import dbConnect from '@/utils/database'


dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
    } = req;


    switch (method) {

        case "GET":
            try {
                const data = await keymasterTypes.find({})
                res.status(200).json({ success: true, data: data })

            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break;

        case "POST":
            try {
                const { keymasterType } = req.body;

                const type = await keymasterTypes.findOne({ keymasterType: keymasterType });
                if (type) 
                    return res.status(200).json({ success: false, msg: "Keymaster Type already exists" });

                await keymasterTypes.create({keymasterType});
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
