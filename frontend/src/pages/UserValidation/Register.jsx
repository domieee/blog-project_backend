
import { useRef, useState } from 'react'
import { Link, Route, useNavigate, Outlet } from 'react-router-dom'
import uuid4 from "uuid4"
import RegisterDetails from "./RegisterDetails"
import './Register.scss'

const Register = ({ user, setUser }) => {


    const navigate = useNavigate();
    let email = useRef('')
    let password = useRef('')
    let confirmPassword = useRef('')

    const [error, setError] = useState(false)
    const [errorKey, setErrorKey] = useState('')

    const register = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/register`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    id: uuid4(),
                    mail: email.current.value,
                    password: password.current.value,
                    confirmPassword: confirmPassword.current.value,
                    firstName: '',
                    lastName: '',
                    description: '',
                    destinations: []
                })
            })

            if (response.ok) {
                const result = await response.json()
                setUser(result.user.insertedId)
                navigate('/register/2')
            } else {
                console.log(response)
                const error = await response.json()
                console.log(error)
                switch (error.key) {
                    case 'email':
                        setErrorKey('mail')
                        break;
                    case 'password':
                        setErrorKey('password')
                        break;
                    case 'confirmPassword':
                        setErrorKey('confirmPassword')
                        break;
                    case 'noMatch':
                        setErrorKey('noMatch')
                        break;
                }
                throw new Error(errorKey)
                setError(error.msg)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="register">
            <h2>Register</h2>
            <input
                ref={email}
                type="email"
                name="mail"
                id="mail"
                className={errorKey === 'mail' ? 'errorInput' : null}
                placeholder='john@doe.com'
                required />

            <input
                ref={password}
                type="password"
                name="password"
                id="password"
                className={errorKey === 'password' || errorKey === 'noMatch' ? 'errorInput' : null}
                placeholder='Password'
                required />
            <input
                ref={confirmPassword}
                type="password"
                name="password"
                id="passwordCofirm"
                placeholder='Confirm Password'
                className={
                    errorKey === 'confirmPassword' ||
                        errorKey === 'noMatch' ?
                        'errorInput' : null
                }
                required />
            {error && <span className="error">{error}</span>}
            <Link
                to={RegisterDetails}
                onClick={register}>Create Account
            </Link>

            <span>Already a member? <Link to="/login">Login</Link></span>
        </section>
    );
}

export default Register;