import jwt from 'jsonwebtoken'
import { parseCookies } from 'nookies'

export function verifyJwt(context) {
    const { 'tatsuya-token': token } = parseCookies(context);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            return decoded;
        } catch {
            return false;
        }
    } else {
        return false;
    }
}
