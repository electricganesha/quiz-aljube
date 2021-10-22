import db from "../../utils/db"; 

const updateWinner = (req) => {
    const body = JSON.parse(req.body);
    db.collection('winner').doc(body.doc_id).set({
        created_at: new Date(),
        user_id: body.user_id,
        name: body.name,
        email: body.email,
        ...(body.phone && {phone: body.phone})
    }, { merge: true }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    return { status: "Winner successfuly updated" };
}

export default async (req, res) => {
    try {
        switch (req.method) {
            case "POST": {
                const json = await updateWinner(req);

                res.status(200).json(json);
                break;
            }
            default: {
                res.status(405).end();
            }
        }
    } catch (error) {
        console.log(error);
        res.statusMessage = "Winner could not be updated";
        res.status(503).end();
    }
}
