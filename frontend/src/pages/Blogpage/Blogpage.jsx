import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import Navigation from '../../components/Navigation/Navigation';
import Author from '../../components/Author/Author.jsx'
import './Blogpage.scss'

const Blogpage = ({ posts }) => {

    const params = useParams();

    window.scrollTo(0, 0)

    const article = posts?.find(data => data.id === params.id)

    if (!article) {
        return
    }

    return (
        <>
            <Parallax blur={1} bgImage={`${article.imgSrcBlog}`} bgImageAlt="the cat" strength={300}>
                <article className='destination'>
                    <h1>{article.destination}</h1>
                    <p>{article.subtext}</p>
                    <a href={`/posts/${params.id}#article`}>Explore</a>
                </article>
            </Parallax >
            <section id='article'>
                <h2>{article.mainHeading}</h2>
                <p>{article.mainText}</p>
                <h2>Index</h2>
                {posts && article && article.content.map((chapter, index) => {
                    return (
                        <article className='index-list' id={`grid-item-${index + 1}`}>
                            <a href={`#chapter-${index + 1}`}>{`${index + 1}. ${chapter.heading}`}</a>
                        </article>
                    )
                })
                }
                <article className='chapter' >

                    {
                        posts && article && article.content.map((chapter, index) => {
                            return (
                                <>
                                    <h3>{chapter.heading}</h3>
                                    <p>{chapter.text}</p>
                                </>
                            )
                        })
                    }
                </article>
                <Author />
            </section >
        </>
    )

}

export default Blogpage;