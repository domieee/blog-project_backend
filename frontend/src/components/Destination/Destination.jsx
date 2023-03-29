import './Destination.scss'

import { Link } from 'react-router-dom'

const Destinations = (posts) => {

    console.log(posts.data);
    return (
        <section id='landing-grid'>
            <h2>Explore the world</h2>
            <p>Get ready to expand your horizons and embrace new cultures! Join us as we embark on an exciting journey to explore the world and all its wonders.</p>
            <div className='item-row'>
                {posts && posts.data.map((post, index) => {
                    return (

                        <article className='grid-item' id={`grid-item-${index + 1}`}
                            style={{ backgroundImage: `url(${post.imgSrc})` }}>
                            <div className='grid-content'>
                                <h3>{post.destination}</h3>
                                <p>{post.title}</p>
                                <Link to={`post/${post.id}`} >Explore</Link>
                            </div>

                            <div className='overlay'></div>
                        </article>

                    )
                })}
            </div>
        </section>
    );
}

export default Destinations;