const  axios = require('axios');
const { addNewCharacters } = require('./dynamo');

const seedData = async () =>{
  const url = "https://hp-api.onrender.com/api/characters";
  try{
    const {data: character} = await axios.get(url);
    const result = character.map((data,i) => 
      addNewCharacters({...data, id: i++})
    );

    await Promise.all(result);

  }catch(err){
    console.log('There Was an Error')
    console.log(err);
  }
}

seedData()
