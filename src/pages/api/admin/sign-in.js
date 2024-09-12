import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from 'nookies'

import { connectToDatabase } from '../../../services/mongodb'

export async function signIn(username, password) {
    const mongocli = await connectToDatabase();
    let user = null;
    try {
        let db = mongocli.db;
        user = await db
            .collection('admin-users')
            .findOne({ username: username }, {
                projection: {
                    _id: false,
                    username: true,
                    token: true
                }
            });
    } catch (error) {
        return { success: false, message: "Unable to reach database: " + error.message };
    }

    const matched = bcrypt.compareSync(password, user ? user.token : '');
    if (matched) {
        const token = jwt.sign(
            { username: username },
            process.env.SECRET_KEY
        );
        return { success: true, token };
    } else {
        return { success: false, message: "Invalid username or password." };
    }

}

export default async function handler(req, res) {
    // Restricts endpoint to only POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Only POST requests are allowed.');
    }

    // Gets parameters from request body
    const { username, password } = req.body;

    const resultSignIn = await signIn(username, password);

    if (resultSignIn.success) {
        setCookie({ res }, 'tatsuya-token', resultSignIn.token, { path: '/', maxAge: 30 * 24 * 60 * 60 }); // 1 month
        res.status(200).json({ success: true, message: 'Signed in successfully.' });
    } else {
        res.status(400).json({ success: false, message: resultSignIn.message });
    }

}