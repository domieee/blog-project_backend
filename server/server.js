import express from 'express'
import cors from 'cors'
import multer from 'multer'

import {
    readData,
    writeFile,
} from './functions.js'

import {
    register,
    login
} from './controller/authController.js'

import './util/config.js'

import { encrypt } from './middleware/authMiddleware.js'

const app = express()
const PORT = 8080 || process.env.BACKFALL_PORT;

app.use(cors({
    origin: true,
    credentials: true
}))

const upload = multer({ dest: 'uploads/' })

app.use(express.json())

app.get('/', readData)

app.post('/editor', writeFile)

app.post('/register', encrypt, register)
app.post('/login', encrypt, login)

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
