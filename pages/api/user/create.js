import db from "../../../utils/db";
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  try {
    console.log("CREATING USER");
    const user_id = uuidv4();
    const session_start = new Date();
    var doc = db.collection('users').doc();
    doc.set({user_id, session_start, score: 0 }, {merge: true})
    res.status(200).json({ user: {
      user_id,
      doc_id: doc.id,
    }, status: "User successfuly created"}); 
  } catch(err) {
    console.log(err);
  }
};
