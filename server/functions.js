import fs from 'fs'

export const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./posts.json', { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error('Error reading JSON:', err)
                reject(err)
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    console.error('Error parsing JSON:', err)
                    reject(err)
                }
            }
        });
    });
};

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