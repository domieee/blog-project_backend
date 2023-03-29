import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import Navigation from '../../components/Navigation/Navigation';
import './Blogpage.scss'

const Blogpage = (posts) => {
    const params = useParams();
    const [article, setArticle] = useState([]);


    useEffect(() => {
        for (let i = 0; i < posts.data.length; i++) {
            if (posts.data[i].id === params.id) {
                setArticle(posts.data[i])
            }
        }
    }, [], params.id)

    console.log(article);
    return (
        <section id='article'>
            <Parallax blur={1} bgImage={`https://images.unsplash.com/photo-1559070134-1cf028349181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`} bgImageAlt="the cat" strength={300}>
                <Navigation />
                <>
                    <article className='destination'>
                        <h1>{article.destination}</h1>
                        <p>{article.subtext}</p>
                        <a href={`/#article`}>Explore</a>
                    </article>
                </>
            </Parallax >

            <h2>Summary</h2>
            {
                posts && article.content.map((chapter, index) => {
                    return (
                        <>
                            <article className='grid-item' id={`grid-item-${index + 1}`}>
                                <a href={`chapter-${index}`}>{chapter.heading}</a>
                            </article>
                        </>
                    )
                })
            }


            {
                posts && article.content.map((chapter, index) => {
                    return (<>

                        <article className='chapter' id={`chapter${index + 1}`}>
                            <h3>{chapter.heading}</h3>
                            <p>{chapter.text}</p>
                        </article>
                    </>
                    )
                })
            }

        </section >
    )

}

export default Blogpage;