const fs = require('fs');
const csv = require('csv-parse');

const csvDataFetcher = (fileName) => {
  const result = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(`../data/${fileName}.csv`)
    .on('error', error => {
      reject(error)
    })
    .pipe(csv.parse({
      columns: true
    }))
    .on('data', (row) => {
      result.push(row)
    })
    .on('end', () => {
      resolve(result)
    })
  })
}

export default csvDataFetcher;
