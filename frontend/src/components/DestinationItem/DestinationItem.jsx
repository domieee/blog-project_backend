import { Link } from 'react-router-dom'
import { Skeleton, Box } from '@mui/material/';
import './DestinationItem.scss'

const DestinationItem = (post) => {
    console.log(post.author);
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
                <p>by {post.author}</p>
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