import { Outlet, Navigate } from "react-router-dom";

const Protect = () => {

    const verify = () => {
        fetch(`${import.meta.env.VITE_BACKEND}/validate`, {
            credentials: 'include'
        }).then(response => response.ok ? true : false)
    }

    if (verify()) return <Navigate to={'/'} replace />
    return (
        <Outlet />
    )
}


export default Protect;