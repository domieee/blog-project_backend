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
        await db.collection('users').insertOne(req.body)
        const dbUser = await db.collection('users').findOne({ mail: req.body.mail })
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
    await db.collection('users').updateOne({ id: req.claim.user }, {
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
    if (!await check(req.body.mail)) {
        console.log('LOGIN: user registered')
        const dbUser = await db.collection('users').findOne({ mail: req.body.mail })
        const token = createToken(dbUser)
        res.cookie('token', token, cookieConfig)
        res.json({ user: dbUser })

    }
    else {
        console.log('LOGIN: user not registered')
        res.status(400).json({ msg: 'E-Mail or password incorrect', key: 'email' })
    }
}

export function logout(req, res) {
    res.clearCookie('token')
    res.end()
}


