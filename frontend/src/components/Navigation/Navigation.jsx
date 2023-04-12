import './Navigation.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = () => {

    const [navClass, setNavClass] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0);

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
            <button>Register</button>
        </nav >
    );
}

export default Navigation;