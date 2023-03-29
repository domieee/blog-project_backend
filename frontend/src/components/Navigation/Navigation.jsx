import './Navigation.scss'

const Navigation = () => {
    return (
        <nav>
            <div className="nav-options">
                <a href="">Home</a>
                <a href="">Destinations</a>
                <a href="">About</a>
            </div>
            <span>Footprints Worldwide</span>
            <button>Admin Panel</button>
        </nav>
    );
}

export default Navigation;