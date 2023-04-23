import { getDb } from "../util/db.js"
import { createToken } from "../util/token.js"

const cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}

async function check(mail) {
    const db = await getDb()
    const result = await db.collection('users').findOne({ mail: mail })
    if (result === null) {
        console.log('REGISTER: user not registered')
        return true
    } else {
        console.log('REGISTER: user registered')
        return false
    }
}

export async function register(req, res) {
    const db = await getDb()
    if (await check(req.body.mail)) {
        await db.collection('users').insertOne(req.body)
        const dbUser = await db.collection('users').findOne({ mail: req.body.mail, password: req.body.password })
        const token = createToken(dbUser)
        res.cookie('token', token, cookieConfig)
        res.send(dbUser._id)
    } else {
        res.status(401).end()
    }
}

export async function login(req, res) {
    const db = await getDb()
    const dbUser = await db.collection('users').findOne({ mail: req.body.mail, password: req.body.password })
    if (dbUser === null) {
        console.log('LOGIN: user not registered')
        res.status(401).end()
    }
    else {
        console.log('LOGIN: user registered')
        const token = createToken(dbUser)
        console.log(token)
        res.cookie('token', token, cookieConfig)
        res.send(dbUser._id)
    }
}

export function logout(req, res) {
    res.clearCookie('token')
    res.end()
}


