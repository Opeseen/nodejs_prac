const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');
const { addNewRecords } = require('./dynamo');

const csv_path = path.join(__dirname,'Employee_info.csv');

const csv_parse = [];

fs.createReadStream(csv_path)
.pipe(parse({
  comment: '#',
  columns: true
}))
.on('data', (data) => {
  for (const x in data){
    data[x] = data[x].trim()
  }
  csv_parse.push(data)
  csv_parse.forEach((element) => {
    element.Employee_Number = Number(element.Employee_Number)
    addNewRecords(element)
  })

})
.on('error', (error) => {
  console.log(error)
})
.on('end', () => {
  console.log('Finished')
})

