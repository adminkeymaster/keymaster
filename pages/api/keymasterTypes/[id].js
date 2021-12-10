import dbConnect from '@/utils/database'
import keymasterTypes from '@/models/keymasterTypes'

dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
        query: {id},
    } = req;

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
                const { keymasterType } = req.body;
                await keymasterTypes.updateOne({ _id: id } , { keymasterType: keymasterType })
                res.status(200).json({ success: true, data: keymasterType })

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
