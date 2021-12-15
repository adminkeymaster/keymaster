import users from "@/models/users";
import dbConnect from "@/utils/database";

dbConnect();

function compare( a, b ) {

  let totalTime_a = 0;
  a.record.map( (some) => {
    totalTime_a += some.time;
  })
  totalTime_a = totalTime_a / a.record.length;
  let totalTime_b = 0
  b.record.map( (some) => {
    totalTime_b += some.time
  })
  totalTime_b = totalTime_b / a.record.length;

  if ( totalTime_a < totalTime_b ){
    return -1;
  }
  if ( totalTime_a > totalTime_b ){
    return 1;
  }
  return 0;
}

const requestModHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await users.find({ record: { $exists: true, $not: {$size: 0} } });
        data.sort( compare );
        res.status(200).json({ success: true, data: data[0] })

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
