import jwt from 'jsonwebtoken'
import { parseCookies } from 'nookies'

export function AuthGuard(context) {
    const { 'tatsuya-token': token } = parseCookies(context);
    if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return {
            props: { userAuthenticated: decoded.username }
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
