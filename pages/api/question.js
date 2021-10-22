import db from "../../utils/db";

export default async (req, res) => {
  try {
    const entries = await db.collection("questions").get();
    const entriesData = entries.docs.map((entry) => entry.data());
    res.status(200).json(entriesData);
  } catch(err) {
    console.log(err);
  }
};
