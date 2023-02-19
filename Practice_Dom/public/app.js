// const _data = require('../data')

const clickButton = document.getElementById('formWrapperID');
const formButton = document.getElementById('accountCreate');
// const clickableButton = clickButton.querySelector('button');
const myDiv = document.querySelector('h2');
formButton.addEventListener('submit',clickSubmit)


function clickSubmit(event){
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;  
  userObject = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    password: password
  };
  console.log(userObject);
  _data.create('users',phone,userObject,(err) => {
    if(!err){
      console.log('Success');
    }else{
      console.log('Failure');
    }
  });

};

// const submitButton = formID.querySelector('button');

// formID.addEventListener('click',clickSubmit);



// myDiv.style.color = "green"
