const {parse} = require('csv-parse');
const http = require('http');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;

const result = [];

isHabitablePlanet = (planet) => {
	return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
	// return planet['Name'] === 'taiye'
};

fs.createReadStream('kepler_data.csv')
	.pipe(parse({
		comment: '#',
		columns: true
	}))
	.on('data', (data) => {
		if(isHabitablePlanet(data)){
			result.push(data)
		}
	})
	.on('error', (error) => {
		console.log(error)
		console.log('There was an error')
	})
	.on('end', () => {
		console.log(result.map((planet) => {
			// return planet
		}))
		console.log(`${result.length} habitable planets found!`);
		// console.log(result)
	});

const friends = [
	{id: 0, Name:'Isaac Newton'},
	{id: 1, Name:'Albert Einsten'},
	{id: 2, Name:'Opeyemi Alabi'}
];

server = http.createServer((req,res) => {
	const items = req.url.split('/');
	if(req.method === 'POST' && items[1] === 'friends'){
		req.on('data',(data) => {
			const friend = data.toString();
			friends.push(JSON.parse(friend));
			console.log('Request:',JSON.parse(friend));
		})
		req.pipe(res)
	}else if(req.method === 'GET' && items[1] === 'friends'){
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});
		if(items.length === 3){
			const friendIndex = +items[2];
			res.end(JSON.stringify(friends[friendIndex]))
		}else{
			res.end(JSON.stringify(result));
		}

	}else if(req.method === 'GET' && items[1] === 'messages'){
		res.setHeader('Content-Type','text/html');
		res.write('<html>');
		res.write('<body>');
		res.write('<ul>');
		res.write('<li>Hello Opeyemi!</li>');
		res.write('<li>What are your thoughts on coding?</li>');
		res.write('</ul>');
		res.write('</body>');
		res.write('</html>');
		res.end()

	}

});



server.listen(3000,() => {
	console.log('Server is listening on port 3000')
});
