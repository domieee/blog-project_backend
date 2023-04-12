import './Editorpage.scss'
import React, { useState } from 'react';
import DestinationItem from '../../components/DestinationItem/DestinationItem';
import Placeholder from '../../assets/img/placeholder.jpg'
import ConfettiGenerator from "confetti-js";
import uuid4 from "uuid4";

const Editorpage = () => {


    let [title, setTitle] = useState("")
    let [destination, setDestination] = useState("")
    let [description, setDescription] = useState("")
    let [mainHeading, setMainHeading] = useState("")
    let [mainText, setMainText] = useState("")
    let [chapters, setChapter] = useState([])
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [img, setImg] = useState(-1)
    const [idEdit, setIdEdit] = useState(null);

    const onChangePicture = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const articleConstructor = () => {
        setChapter((current) => [...current, { heading: document.querySelector('#heading').value, content: document.querySelector('#content').value }]);
    }

    async function postData() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}`, {
                method: "POST",
                body: JSON.stringify({
                    id: uuid4(),
                    title: title,
                    destination: destination,
                    subtext: description,
                    mainHeading: mainHeading,
                    mainText: mainText,
                    text: chapters,
                    imgSrc: imgData,
                    imgSrcBlog: imgData
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <section className='editor'>
                <h2>Create your own article</h2>
                <p>An article consists of a main heading, and a short introduction of what your article is about. </p>
                <form className="content-editor">
                    <section className='form-head'>
                        <article className='head-card'>
                            {imgData != null ?
                                <DestinationItem
                                    id={uuid4()}
                                    title={title}
                                    destination={destination}
                                    subtext={description}
                                    imgSrc={imgData}
                                    index={0} /> :
                                <DestinationItem
                                    id={uuid4()}
                                    title={title}
                                    destination={destination}
                                    subtext={description}
                                    imgSrc={Placeholder}
                                    index={0} />
                            }
                        </article>
                        <article className="head-input">
                            <h3>Editor</h3>
                            <label htmlFor="destination">Destination</label>
                            <input
                                type="text"
                                name='destination'
                                id='destination'
                                placeholder='e.g. "Bali"'
                                onChange={(e) => {
                                    setDestination(destination = e.target.value);
                                }} />
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder='e.g. "Island of Gods, Beaches, and Culture"'
                                onChange={e => {
                                    setTitle(title = e.target.value);
                                }} />
                            <label htmlFor="subtext">Description</label>
                            <input
                                type="text"
                                name='subtext'
                                id='subtext'
                                placeholder='e.g. "Where every moment is an adventure in paradise!"'
                                onChange={(e) => {
                                    console.log(title);
                                    setDescription(description = e.target.value);
                                }} />
                        </article>

                        <article className='head-image'>
                            <div>
                                <label htmlFor="imgSrc">Choose a image for the card preview</label>
                                <input
                                    type="file"
                                    name='imgSrc'
                                    id='imgSrc'
                                    onChange={onChangePicture} />
                            </div>
                            <div>
                                <label htmlFor="imgSrcBlog">Choose a image for the blog preview</label>
                                <input
                                    type="file"
                                    name="imgSrcBlog"
                                    id="imgSrcBlog"
                                    placeholder='' />
                            </div>
                        </article>
                        <div className='head-heading'>
                            <label htmlFor="heading">Heading</label>
                            <input
                                type="text"
                                name="heading"
                                id="heading"
                                placeholder='e.g. "Discovering Bali: A Paradise Island in Indonesia"' />
                        </div>

                        <div className='head-content'>
                            <label htmlFor="content">Content</label>
                            <textarea
                                name="content"
                                id="content"
                                cols="200"
                                rows="3"
                                placeholder='e.g. "Bali, an island located in Indonesia, is known for its breathtaking scenery, rich culture, and warm hospitality. From its stunning beaches to its lush green rice paddies and majestic volcanoes, Bali offers a unique and unforgettable travel experience. In this article, well explore the beauty and culture of Bali and share some of the must-see sights and experiences."'></textarea>
                        </div>
                        <button type='button' className='head-button' onClick={articleConstructor}>Create Chapter</button>
                    </section>

                    <article className="content-preview">
                        <h3>Preview</h3>

                        {destination ?
                            <h1>{`${destination}: ${title}`}</h1> :
                            <h1></h1>
                        }
                        <p>{description}</p>

                        <article>
                            {chapters.map((chapter, index) => {
                                return (
                                    <>
                                        <article className='index-list' id={`grid-item-${index + 1}`}>
                                            <a href={`#chapter-${index + 1}`}>{`${index + 1}. ${chapter.header}`}</a>
                                        </article>
                                    </>
                                )
                            })}

                            {chapters.map((chapter, index) => {
                                return (
                                    <>
                                        <h4>{`${index}. ${chapter.header}`}</h4>
                                        <p>{chapter.content}</p>
                                    </>
                                )
                            })}
                        </article>
                        <button onClick={postData}>Publish</button>
                    </article>
                </form>
            </section >
        </>
    )
}

export default Editorpage;