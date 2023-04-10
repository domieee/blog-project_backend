import '../../reset.scss'
import './Destination.scss'
import uuid4 from 'uuid4';
import { Link } from 'react-router-dom'
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import DestinationItem from '../DestinationItem/DestinationItem';

gsap.registerPlugin(ScrollTrigger)

const Destinations = (posts) => {

    document.addEventListener("scroll", () => {
        console.log(window.scrollY);
    })

    if (document.querySelector('.item-row')) {
        gsap.to(".item-row", {
            duration: 1,
            scrollTrigger: ".team",
            y: 10,
            opacity: 1,
            stagger: 0.1 //seconds between when each ".box" element starts animating
        });

        gsap.to(".catch-phrase", {
            scrollTrigger: ".item-row",
            duration: 1.3,
            x: 50,
            opacity: 1,
            stagger: {
                duration: 5,
                scale: 0.1,
                axis: "x",
                from: 1
            }// 0 // 0.1 seconds between when each ".box" element starts animating
        });
    }

    console.log(posts.data.title);
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
                            index={index} />
                    )
                })}
            </div>
        </section>
    );
}

export default Destinations;