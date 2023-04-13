import express from 'express'
import './util/config.js'
import cors from 'cors'

import {
    readData,
    writeFile,
} from './functions.js'

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL }))
const PORT = 8080 || process.env.BACKFALL_PORT;

app.use(express.json())

app.get('/', async (req, res, next) => {
    console.log('object');
    const result = await readData()
    res.send(result)
})

app.post('/editor', (req, res, next) => {
    console.log(req, 'asdsd');
    console.log(req.body);
    writeFile(req.body)
        .then(data => {
            res.send(data)
        })
})

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
