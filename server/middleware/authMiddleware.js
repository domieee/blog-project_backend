import { createHmac } from 'crypto'

import { verifyToken } from '../util/token.js'

export function encrypt(req, res, next) {
    const hmac = createHmac('sha512', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}

export const verifyJWTCookie = (req, res, next) => {
    const token = req.cookies.token
    try {
        const claim = verifyToken(token)
        req.claim = claim
        console.log('Unser Claim:', req.claim);
        next(req.claim.body)
    } catch (err) {
        console.log(err.message)
        res.status(401).end()
    }
}