import './Login.scss'

import { useRef, useState } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import uuid4 from 'uuid4'

function Login({ user, setUser }) {


    const [error, setError] = useState(false)
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
                setError(true)
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (

        < section className="login" >
            <h2>Login</h2>
            {error && <span className="error">E-Mail oder Passwort nicht bekannt</span>}
            <input
                ref={email}
                type="email"
                name=""
                id=""
                placeholder='john@doe.com' />
            <input
                ref={password}
                type="password"
                name="password"
                id="password"
                placeholder='Password'
            />

            <button
                onClick={login}>Login
            </button>
        </section >
    );
}

export default Login;