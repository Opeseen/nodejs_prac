const a = true;

const promise = new Promise((resolve,reject) => {
  if (a){
    resolve('Stuff Worked!')
  }else{
    reject('Stuff does not work')
  }

});

promise
  .then(result => console.log(result))
  .catch((error) => console.log(error))


const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

Promise.all(urls.map(url => {
  return fetch(url).then(resp => resp.json())
})).then(results => {
  console.log(results[1])
}).catch((error) => console.log(error))
