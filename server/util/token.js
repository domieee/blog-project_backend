import jwt from 'jsonwebtoken'

export const createToken = (user) => {
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    console.log(token)
    return token
}