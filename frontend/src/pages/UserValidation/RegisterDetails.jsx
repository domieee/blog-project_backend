import { useEffect, useState, useRef } from "react";
import { TextField } from '@mui/material'
import './RegisterDetails.scss';

const RegisterDetails = () => {

    const firstName = useRef('')
    const lastName = useRef('')
    const description = useRef('')

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);

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

    const submitProfileInfo = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/register-details`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                description: description.current.value
            })
        })
        console.log(response)
    }

    return (
        <section className="registerDetails">

            <h1>Tell a bit more about yourself</h1>
            <img src={imgData != null ? imgData : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg"} alt="" />
            <input type="file"
                onChange={onChangePicture} />

            <input
                ref={firstName}
                type="text"
                name="name"
                id="name"
                placeholder="Jane" />

            <input
                ref={lastName}
                type="text"
                name="name"
                id="name"
                placeholder="Doe" />

            <textarea
                ref={description}
                name="description"
                id="description"
                cols="30"
                rows="5" />

            <button
                onClick={submitProfileInfo}>
                Submit
            </button>
        </section>

    )
}

export default RegisterDetails;