import db from "../../../utils/db";

export default async (req, res) => {
  try {
    const entries = await db.collection("answers").where('id', '==', req.query.id).get();
    const entriesData = entries.docs.map((entry) => entry.data());
    res.status(200).json(entriesData[0].answer);
  } catch(err) {
    console.log("ERROR: ", err);
  }
};
