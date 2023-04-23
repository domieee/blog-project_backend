
import { useRef, useState } from 'react'
import { Link, Route, useNavigate } from 'react-router-dom'
import uuid4 from "uuid4"
import './Register.scss'

const Register = ({ user, setUser }) => {


    const navigate = useNavigate();
    let firstName = useRef('')
    let lastName = useRef('')
    let email = useRef('')
    let password = useRef('')

    const [error, setError] = useState(false)

    const register = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/register`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    id: uuid4(),
                    name: firstName.current.value + " " + lastName.current.value,
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    mail: email.current.value,
                    password: password.current.value
                })
            })
            if (response.ok) {
                const json = await response.json()
                setUser(json)
                navigate('/')
            } else {
                setError(true)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <section className="register">
            <h2>Register</h2>
            <input
                ref={firstName}
                type="text"
                name="name"
                id="name"
                placeholder='John'
                required />
            <input
                ref={lastName}
                type="text"
                name="lastName"
                id="lastName"
                placeholder='Doe'
                required />
            <input
                ref={email}
                type="email"
                name="mail"
                id="mail"
                placeholder='john@doe.com'
                required />
            {error && <span className="error">Mail bereits registriert</span>}
            <input
                ref={password}
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                required />
            <input
                ref={password}
                type="password"
                name="password"
                id="passwordCofirm"
                placeholder='Confirm Password'
                required />
            <button
                onClick={register}>Create Account
            </button>
            <span>Already a member? <Link to="/login">Login</Link></span>

        </section>
    );
}

export default Register;