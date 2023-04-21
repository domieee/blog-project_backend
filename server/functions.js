import fs from 'fs/promises'
import { getDb } from './util/db.js'
import { ObjectId } from "mongodb";

const COL = 'destinations'

export async function readData(req, res) {
    try {
        const db = await getDb()
        const docs = await db.collection(COL).find({}).toArray()
        res.send(docs)
    } catch (err) {
        console.log(` Error reading data: ${err.message}`)
    }
}

export async function writeFile(req, res) {
    try {
        const db = await getDb()
        await db.collection(COL).insertOne(req.body)
        res.end()
    } catch (err) {
        console.log(`Error writing data: ${err.message}`)
    }
}