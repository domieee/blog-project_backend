import './Navigation.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = () => {

    const navigate = useNavigate()
    const [navClass, setNavClass] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0);

    const logout = async () => {
        await fetch(`${import.meta.env.VITE_BACKEND}/logout`, {
            credentials: 'include'
        })
        navigate('/')
    }

    const controlNavbar = () => {
        if (window.scrollY != 0) {
            setNavClass(true);
        } else {
            setNavClass(false);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <nav
            className={navClass ? 'nav-colored' : "nav-transparent"}>
            <div className="nav-options">
                <Link to='/'>Home</Link>
                <Link to='/posts'>Destinations</Link>
                <Link to='/editor'>Editor</Link>
            </div>
            <span>Footprints Worldwide</span>
            <div className='userOptions'>
                <Link className='loginButton' to='/login'>Login</Link>
                <Link className='registerButton' to='/register'>Register</Link>
                <button onClick={logout}>Logout</button>
            </div>
        </nav >
    );
}

export default Navigation;