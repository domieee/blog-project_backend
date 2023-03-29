import express from 'express'
import cors from 'cors'

import posts from './posts.json' assert { type: "json" };

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
const PORT = 8080;


app.get('/', (req, res, next) => {
    res.send(posts)
    res.end();
})

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
