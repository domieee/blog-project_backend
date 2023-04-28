import { ObjectId } from "mongodb"
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
    console.log(req.body)
    if (await check(req.body.mail)) {
        const dbUser = await db.collection('users').insertOne(req.body)
        console.log('dbuser', dbUser)
        const token = createToken(dbUser)
        res.cookie('token', token, cookieConfig)
        res.json({ user: dbUser })
    } else {
        res.status(400).json({ msg: 'E-Mail already registered', key: 'email' })
    }
}

// Gets the user id from verifyJWTcookie() and updates the props
export async function registerDetails(req, res) {
    const db = await getDb()
    let o_id = new ObjectId(req.claim.user)
    await db.collection('users').updateOne({ _id: o_id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description
        }
    })
    res.end()
}

export async function login(req, res) {
    const db = await getDb()
    const dbUser = await db.collection('users').findOne({ mail: req.body.mail, password: req.body.password })
    if (dbUser === null) {
        console.log('LOGIN: user not registered')
        res.status(400).json({ msg: 'E-Mail or password incorrect', key: 'email' })
    }
    else {
        console.log('LOGIN: user registered')
        const token = createToken(dbUser)
        console.log(token)
        res.cookie('token', token, cookieConfig)
        res.json({ user: dbUser._id })
    }
}

export function logout(req, res) {
    res.clearCookie('token')
    res.end()
}


