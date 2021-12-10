import ageGroup from '@/models/ageGroup'
import dbConnect from '@/utils/database'


dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
    } = req;


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
                const { age } = req.body;

                const tempAgeGroup = await ageGroup.findOne({ age: age });
                if (tempAgeGroup) 
                    return res.status(200).json({ success: false, msg: "ageGroup already exists" });

                await ageGroup.create({age});
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
