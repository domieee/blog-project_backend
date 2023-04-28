import jwt from 'jsonwebtoken'

export const createToken = (user) => {
    console.log(user)
    const token = jwt.sign({ user: user.insertedId }, process.env.JWT_SECRET, { expiresIn: '1h' })
    console.log(token)
    return token
}

export const verifyToken = (token) => {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    return result
}