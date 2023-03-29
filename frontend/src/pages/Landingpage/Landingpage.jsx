import './Landingpage.scss'
import landingpagePicture from '../../assets/img/landingpage_top.jpg'
import { Parallax } from 'react-parallax'
import Team from '../../components/Team/Team';
import Destination from '../../components/Destination/Destination.jsx'
import Navigation from '../../components/Navigation/Navigation';

import { Link } from 'react-router-dom';


const LandingPage = (posts) => {
    return (
        <>
            <Parallax blur={1} bgImage={landingpagePicture} bgImageAlt="the cat" strength={300}>
                <Navigation />
                <article className='call-to-action'>
                    <h1>Embark on an Unforgettable Journey with Our Travel Blog!</h1>
                    <p>Are you ready to embark on a journey of a lifetime? If so, follow our travel blog and join us as we explore the world's most incredible destinations! From the majestic mountains of the Himalayas to the pristine beaches of the Caribbean, we've got you covered. Our team of experienced travelers will guide you through each step of your journey, providing you with insider tips and tricks to make your trip unforgettable. Don't wait any longer to start your adventure - join our community of travelers today and let's start exploring the world together!</p>
                    <a href="#landing-grid">Explore</a>
                </article>
            </Parallax>
            <Destination data={posts.data} />
            <Team />
        </>
    );
}

export default LandingPage;