import { Link } from 'react-router-dom'
import './DestinationItem.scss'

const DestinationItem = (post) => {
    console.log(post);
    return (
        <article
            className='grid-item'
            id={`grid-item-${post.index + 1}`}>

            <div
                className='background'
                style={{ backgroundImage: `url(${post.imgSrc})` }}>
            </div>

            <div className='overlay'></div>

            <div className='grid-content'>
                <h3>{post.destination}</h3>
                <p>{post.title}</p>
                <div></div>

                <Link
                    className='explore'
                    to={`posts/${post.id}`} >
                    Explore
                </Link>

            </div>
        </article>
    );
}

export default DestinationItem;