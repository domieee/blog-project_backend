import fs from 'fs/promises'
import { getDb } from './util/db.js'
import { ObjectId } from "mongodb";

const COL = 'destinations'

export async function readData() {
    const db = await getDb()
    console.log(db);
    const docs = await db.collection(COL).find({}).toArray()
    console.log(docs);
    return docs

}

export function writeFile(article) {
    return new Promise((resolve, reject) => {
        readData()
            .then(data => {
                data.push(article)
                console.log(data);
                resolve(fs.writeFile('./posts.json', JSON.stringify(data), { encoding: 'utf-8' }, (err) => {
                    if (err) {
                        console.log('Error writing file:', err)
                        reject(err)
                    }
                }))
            })
    })
}