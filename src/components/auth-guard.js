import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Loading from './loading'

export default function AuthGuard({ children, showLoading }) {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        setIsAuthenticated(false);
        var delay = 0;
        if (showLoading) {
            delay = 1200;
        }
        setTimeout(() => fetch('/api/admin/check-session', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (!response.success) {
                    setIsAuthenticated(false);
                    router.push({
                        pathname: '/admin/login'
                    });
                } else {
                    setIsAuthenticated(true);
                }
            }), delay);

    }, []);

    return (isAuthenticated ? children : showLoading ? <Loading></Loading> : <></>);
}