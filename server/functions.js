import fs from 'fs/promises'
import { getDb } from './util/db.js'
import { ObjectId } from "mongodb";

const COL = 'users'

async function getDestinations(db) {
    const docs = await db.collection(COL).aggregate([
        {
            $match: {}                                                  // Match documents where mail is "robi@roboter.lol"
        },
        {
            $project: { destinations: 1, firstName: 1, lastName: 1 }    // Only include the "destinations" field in the output
        }
    ]).toArray()
    console.log(docs)
    const destinations = []
    await docs.map(doc => {
        const name = doc.firstName + ' ' + doc.lastName
        doc.destinations.map((destination) => {
            destination.author = name
            destinations.push(destination)
        })
    })
    return destinations
}

export async function readData(req, res) {
    try {
        const db = await getDb()
        const destinations = await getDestinations(db)

        res.send(destinations)
    } catch (err) {
        console.log(` Error reading data: ${err.message}`)
    }
}

export async function writeFile(req, res) {
    try {
        const db = await getDb()
        const author = await db.collection(COL).findOne({ id: req.claim.user })
        await db.collection('users').updateOne({ id: req.claim.user }, {
            $push: {
                destinations: { author: author.firstName + ' ' + author.lastName, content: req.body }
            }
        })

        res.end()
    } catch (err) {
        console.log(`Error writing data: ${err.message}`)
    }
}