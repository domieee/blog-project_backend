import './Landingpage.scss'
import landingpagePicture from '../../assets/img/landingpage_top.jpg'
import { Parallax } from 'react-parallax';

import { Link } from 'react-router-dom';


const LandingPage = (posts) => {

    return (
        <>
            <Parallax blur={10} bgImage={landingpagePicture} bgImageAlt="the cat" strength={200}>
                <nav>
                    <button>Admin Panel</button>
                </nav>
                <p>Are you ready to embark on a journey of a lifetime? If so, follow our travel blog and join us as we explore the world's most incredible destinations! From the majestic mountains of the Himalayas to the pristine beaches of the Caribbean, we've got you covered. Our team of experienced travelers will guide you through each step of your journey, providing you with insider tips and tricks to make your trip unforgettable. Don't wait any longer to start your adventure - join our community of travelers today and let's start exploring the world together!</p>
                <button>Explore</button>
            </Parallax>
            <section id='landing-grid'>
                <h2>Explore the world</h2>
                {posts && posts.map((post, index) => {
                    return (
                        <Link to={`post/${post.id}`} >
                            <article className={`grid-item-${index + 1}`}
                                style={{ backgroundImage: `url(${post.imgSrc})` }}>
                                <h3>{post.destination}</h3>
                            </article>
                        </Link>
                    )
                })}
            </section>
        </>
    );
}

export default LandingPage;