import './Landingpage.scss'
import landingpagePicture from '../../assets/img/landingpage_top.jpg'
import { Parallax } from 'react-parallax'
import { useContext } from 'react';
import Team from '../../components/Team/Team';
import Destination from '../../components/Destination/Destination.jsx'
import Navigation from '../../components/Navigation/Navigation';
import { gsap } from 'gsap'
import { Link } from 'react-router-dom';

const Landingpage = (posts, { user, setUser }) => {
    console.log(user)


    return (
        <>
            <Parallax blur={1} bgImage={landingpagePicture} bgImageAlt="the cat" strength={300}>
                <article className='call-to-action'>
                    <h1>Embark on an Unforgettable Journey with Our Travel Blog!</h1>
                    <p>Are you ready to embark on a journey of a lifetime? From the majestic mountains of the Himalayas to the pristine beaches of the Caribbean, we've got you covered. Our team of experienced travelers will guide you through each step of your journey, providing you with insider tips and tricks to make your trip unforgettable. Don't wait any longer to start your adventure - join our community of travelers today and let's start exploring the world together!</p>
                    {user === true ? <button>Explore</button> : <Link to='/register/1'>Create Account</Link>}
                </article>
            </Parallax>
            <Destination data={posts.data} />
            <Team />
        </>
    );
}

export default Landingpage;