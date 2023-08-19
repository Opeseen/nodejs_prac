const { default: axios } = require('axios');
const express = require('express');
const app = express();
app.use(express.json());


const PORT = 3000;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

app.get('/', async (req,res) => {
  res.setHeader('X-Foo', 'bar')
  try{
    // res.status(200).send('Hello World');
    const response = await axios.post(SPACEX_API_URL,{
      query: {},
      options: {
        populate: [
          {
            path: 'rocket',
            select: {name: 1}
          },
          {
            path: 'payloads',
            select: {'customers': 1}
          }
        ]
      }
    })

    const launchDocs = response.data.docs;
    for(const launches of launchDocs){
      const payloads = launches['payloads'];
      const customers = payloads.flatMap((payload) => {
        return payload['customers'];
      })
      const launch = {
        flightNumber: launches['flight_number'],
        mission: launches['flight_number'],
        rocket: launches['rocket']['name'],
        launchDate: launches['date_local'],
        upcoming: launches['upcoming'],
        success: launches['success'],
        customers,
        payloads
      };
      console.log(launch);
    }
    res.status(200).send('Hello World')
  }catch(error){
    console.log(error)
    res.status(500).json({Message: "Something went wrong"})
  }
});


app.listen(PORT, () => {
  console.log('App is listening on Port',PORT);
});