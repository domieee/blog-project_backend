import './Navigation.scss'
import { Link } from 'react-router-dom';

const Navigation = () => {

    document.addEventListener("scroll", () => {
        console.log(window.screenTop);
    })

    return (
        <nav className={window.screenTop >= 50 ? 'scrolled-nav' : 'transparent-nav'}>
            <div className="nav-options">
                <Link to='/'>Home</Link>
                <Link to='/posts'>Destinations</Link>
                <Link to='/'>About</Link>
            </div>
            <span>Footprints Worldwide</span>
            <button>Admin Panel</button>
        </nav>
    );
}

export default Navigation;