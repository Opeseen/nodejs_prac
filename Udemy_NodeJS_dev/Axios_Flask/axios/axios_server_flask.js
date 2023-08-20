const { default: axios } = require('axios');
const express = require('express');
const app = express();
app.use(express.json());


const PORT = 5000;
const FLASK_API_URL = 'http://127.0.0.1:3000/dashboard'

app.get('/', async (req,res) => {
  res.setHeader('X-Foo', 'bar')
  try{
    const response = await axios.get(FLASK_API_URL)
    console.log(typeof response.data);
    data = response.data;
    data.forEach((element, index, array) => {
      console.log(element.po_number)
      console.log(element._id['$oid'])
    });
    res.status(200).send('Hello World')
  }catch(error){
    console.log(error)
    res.status(500).json({Message: "Something went wrong"})
  }
});


app.listen(PORT, () => {
  console.log('App is listening on Port',PORT);
});