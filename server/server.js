import express from 'express'
import cors from 'cors'

import {
    readData,
    writeFile,
} from './functions.js'


const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
const PORT = 8080;

app.use(express.json())

app.get('/', (req, res, next) => {
    readData()
        .then(data => res.send(data))
})

app.post('/editor', (req, res, next) => {
    console.log(req.body);
    writeFile(req.body)
        .then(data => {
            res.send(data)
        })
})

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
