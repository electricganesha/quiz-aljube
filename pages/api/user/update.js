import db from "../../../utils/db";

const updateUser = (req) => {
    const body = JSON.parse(req.body);
    db.collection('users').doc(body.doc_id).set({
        last_updated_at: new Date(),
        currentQuestion: body.currentQuestion,
        score: body.score,
        ...body.session_closed && { session_closed: body.session_closed },
        ...body.session_closed && { session_close_at: new Date() },
    }, { merge: true }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    return { status: "User successfuly updated" };
}

export default async (req, res) => {
    try {
        switch (req.method) {
            case "POST": {
                const json = await updateUser(req);

                res.status(200).json(json);
                break;
            }
            default: {
                res.status(405).end();
            }
        }
    } catch (error) {
        console.log(error);
        res.statusMessage = "User could not be updated";
        res.status(503).end();
    }
}
