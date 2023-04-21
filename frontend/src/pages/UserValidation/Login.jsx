import './Login.scss'

import { useRef } from 'react'

const Login = () => {

    let email = useRef('')
    let password = useRef('')

    const login = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
                method: "POST",
                body: JSON.stringify({
                    id: uuid4(),
                    mail: email.current.value,
                    password: password.current.value
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
        <section className="login">
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
            />

            <button
                onClick={login}>Login</button>
        </section>
    );
}

export default Login;