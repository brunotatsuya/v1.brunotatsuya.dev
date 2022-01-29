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

export function AuthGuard(context) {
    const decodedResult = verifyJwt(context);
    if (decodedResult) {
        return {
            props: { userAuthenticated: decodedResult.username }
        };
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login"
            }
        };
    }
}
