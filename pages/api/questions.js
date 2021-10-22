import db from "../../utils/db";
import { shuffle } from '../../utils/array';

export default async (req, res) => {
  try {
    const entries = await db.collection("questions").get();
    const entriesData = entries.docs.map((entry) => entry.data());
    const shuffledArray = shuffle(entriesData);
    res.status(200).json(shuffledArray.splice(0, 10));
  } catch(err) {
    console.log(err);
  }
};
