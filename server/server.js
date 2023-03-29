import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
const PORT = 8080;



app.get('/', (req, res, next) => {
    res.send('hallo')
    res.end();
})

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
