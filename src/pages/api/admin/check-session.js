import { verifyJwt } from '../../../services/auth'

export default async function handler(req, res) {
    // Restricts endpoint to only GET requests
    if (req.method !== 'GET') {
        res.status(405).send('Only GET requests are allowed.');
    }

    const resultVerifyJwt = verifyJwt({ req });

    if (resultVerifyJwt) {
        res.status(200).json({ success: true, data: resultVerifyJwt });
    } else {
        res.status(401).json({ success: false, message: 'Session not setted.' });
    }

}