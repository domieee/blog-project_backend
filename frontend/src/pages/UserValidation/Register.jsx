
import { useRef } from 'react'
import uuid4 from "uuid4"
import './Register.scss'

const Register = () => {

    let username = useRef('')
    let email = useRef('')
    let password = useRef('')

    const register = async () => {
        console.log('first')
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/register`, {
                method: "POST",
                body: JSON.stringify({
                    id: uuid4(),
                    name: username.current.value,
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
        <section className="register">

            <input
                ref={username}
                type="text"
                name="name"
                id="name"
                placeholder='John Doe' />
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
                onClick={register}>Register</button>
        </section>

    );
}

export default Register;