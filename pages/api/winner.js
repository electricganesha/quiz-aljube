import db from "../../utils/db";
const nodemailer = require('nodemailer');
import format from 'date-fns/format'

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

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    let mailContent={
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: `Novo Vencedor - A Liberdade não é um jogo!`,
        html: `<h1>Novo vencedor no quiz A Liberdade não é um jogo um jogo!</h1>
        <p>Existe um novo vencedor com os seguintes detalhes:</p>
        <p>Nome completo: ${body.name}</p>
        <p>Email: ${body.email}</p>
        <p>Telefone: ${body.phone}</p>
        <p>Terminou o jogo no dia ${format(
            new Date(),
            "dd/MM/yyyy",
          )} pelas ${format(
            new Date(),
            "HH:mm",
          )}.`,
    };
    
    transporter.sendMail(mailContent, function (err, data) {
        if (err) {
        console.log('error sending email', err);
      } else {
        console.log('email sent successfully');
       }
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
