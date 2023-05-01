import '../../reset.scss'
import './Destination.scss'
import DestinationItem from '../DestinationItem/DestinationItem';
import { useEffect, useState } from 'react';

const Destinations = (posts) => {
    const [postsArray, setPostsArray] = useState([])
    const [postsNum, setPostsNum] = useState(4)


    useEffect(() => {
        const posts = fetch(`${import.meta.env.VITE_BACKEND}/`)
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    }, [])


    console.log(postsArray, '')
    return (
        <section id='landing-grid'>
            <h2 className='catch-phrase'>Explore the world</h2>
            <p className='catch-phrase'>Get ready to expand your horizons and embrace new cultures! Join us as we embark on an exciting journey to explore the world and all its wonders.</p>
            <div className='item-row'>
                {posts && posts.data.map((post, index) => {
                    console.log(post, "asdsd");
                    return (
                        <DestinationItem
                            id={post.id}
                            title={post.title}
                            destination={post.destination}
                            subtext={post.subtext}
                            imgSrc={post.imgSrc}
                            author={post.author}
                            index={index} />
                    )
                })}
            </div>
        </section>
    );
}

export default Destinations;