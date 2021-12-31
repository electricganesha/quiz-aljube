import db from "../../utils/db";

export default async (req, res) => {
  try {
    const entries = await db.collection("winner").orderBy("created_at", "asc").get();
    const entriesData = entries.docs.map((entry) => { 
        const anEntry = entry.data();
        return {
            created_at: new Date(anEntry.created_at.seconds*1000),
            name: anEntry.name,
            phone: anEntry.phone,
            email: anEntry.email,
            user_id: anEntry.user_id
        }});

    res.status(200).json(entriesData);
  } catch(err) {
    console.log(err);
  }
};
