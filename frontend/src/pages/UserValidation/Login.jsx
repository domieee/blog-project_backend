import './Login.scss'

import { useRef, useState } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import uuid4 from 'uuid4'

function Login({ user, setUser }) {

    const [error, setError] = useState(false)
    const [errorKey, setErrorKey] = useState('')

    const navigate = useNavigate();
    let email = useRef('')
    let password = useRef('')


    const login = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    id: uuid4(),
                    mail: email.current.value,
                    password: password.current.value
                })
            })
            if (response.ok) {
                const json = await response.json()
                setUser(json)
                navigate('/')
            } else {
                const error = await response.json()
                setError(error.msg)
                setErrorKey(error.key)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        < section className="login" >
            <h2>Login</h2>

            <input
                ref={email}
                type="email"
                name="email"
                id="email"
                className={errorKey === 'email' ? 'errorInput' : null}
                placeholder='john@doe.com' />
            <input
                ref={password}
                type="password"
                name="password"
                id="password"
                className={errorKey === 'password' ? 'errorInput' : null}
                placeholder='Password'
            />
            {error && <span className="error">{error}</span>}
            <button
                onClick={login}>Login
            </button>
        </section >
    );
}

export default Login;