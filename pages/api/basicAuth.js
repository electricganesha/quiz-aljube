import { m } from "framer-motion";

export default async (req, res) => {
    try {
        const body = JSON.parse(req.body);
        
        if (body.username === process.env.BASIC_AUTH_USERNAME && body.password === process.env.BASIC_AUTH_PASSWORD) {
            res.status(200).json({
                auth: true
            });
        }

        res.status(401).json({
            auth: false
        });
    } catch (err) {
        console.log(err);
    }
};
