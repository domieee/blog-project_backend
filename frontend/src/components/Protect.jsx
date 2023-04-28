import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Protect = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND}/validate`, {
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                setLoading(false)
            } else {
                navigate('/')
            }
        })
    }, [])

    if (loading) return <></>
    return (
        <Outlet />
    )
}

export default Protect;