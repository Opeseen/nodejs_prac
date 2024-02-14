const express = require('express');
const {getEmployees,getEmployeeByID,addNewRecords,deleteEmployee,updateEmployee} = require('./dynamo')

const app = express();

app.use(express.json());

app.get('/employees', async (req, res) => {
  try{
    const record = await getEmployees();
    res.json(record);
  }catch(err){
    console.log('There was an error')
    res.status(500).json({Error: "Error Getting All Employees"})
  }
});


app.get('/employees/:id', async (req, res) => {
  const Employee_id = Number(req.params.id);
  try{
    const record = await getEmployeeByID(Employee_id);
    res.json(record);
  }catch(err){
    console.log('There was an error')
    res.status(500).json({Error: "Error Getting Employees By Their ID"})
    console.log(err)
  }
});

app.post('/employees', async (req,res) => {
  let record = req.body;
  record.Employee_Number = Number(record.Employee_Number)
  try{
    const newRecords = await addNewRecords(record);
    res.json(newRecords);
  }catch(err){
    console.log('There was an error')
    res.status(500).json({Error: "Error Adding Employees"})
    console.log(err)
  }
});

app.put('/employees/:id', async (req,res) => {
  const record = req.body;
  const Employee_Number = Number(req.params.id);
  try{
    const updatedEmployee = await updateEmployee(record,Employee_Number);
    res.json(updatedEmployee);
  }catch(err){
    console.log('There was an error')
    res.status(500).json({Error: "Error Updating Employees"})
    console.log(err)
  }
});

app.delete('/employees/:id', async (req,res) => {
  const Employee_Number = Number(req.params.id);
  try{
    res.json(await deleteEmployee(Employee_Number));
  }catch(err){
    console.log('There was an error')
    res.status(500).json({Error: "Error Deleting Employees"})
    console.log(err)
  }
});
