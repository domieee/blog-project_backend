import { getDb } from "../util/db.js"
import { createToken } from "../util/token.js"

const cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}

export async function register(req, res) {
    const db = await getDb()
    await db.collection('users').insertOne(req.body)
    res.end()
}

export async function login(req, res) {
    const db = await getDb()
    const dbUser = await db.collection('user').findOne({ user: req.body.mail, password: req.body.password })
    if (dbUser === null) res.status(401).end()
    else {
        console.log(dbUser);
        const token = createToken(dbUser)
        res.cookie('token', token, cookieConfig)
        res.end()
    }
}

