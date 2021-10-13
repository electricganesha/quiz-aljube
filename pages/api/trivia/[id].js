import db from "../../../utils/db";

export default async (req, res) => {
  try {
    const entries = await db.collection("trivia").where('id', '==', req.query.id).get();
    const entriesData = entries.docs.map((entry) => entry.data());
    res.status(200).json(entriesData[0]);
  } catch(err) {
    console.log("ERROR: ", err);
  }
};
