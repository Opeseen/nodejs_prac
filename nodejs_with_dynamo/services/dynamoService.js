const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Employee_Records"

const getEmployees = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const record = await dynamoClient.scan(params).promise();
  return record;
};

const addNewRecords = async (record) => {
  const params = {
    TableName: TABLE_NAME,
    Item: record
  };
  await dynamoClient.put(params).promise();
  return "Employee Records Added Successfully!"

};

const getEmployeeByID = async (Employee_Number) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      Employee_Number
    }
  }
  return await dynamoClient.get(params).promise();
};

const updateEmployee = async (record,Employee_Number) => {
  for (const x in record){
    const params = {
      TableName: TABLE_NAME,
      Key: {
        Employee_Number: Employee_Number
      },
      UpdateExpression: `set ${x} = :X`,
      ExpressionAttributeValues: {
        ':X' : `${record[x]}`
      }
    }
    await dynamoClient.update(params).promise();
  }
  
  return "Employee Record Updated Successfully!"

};

const deleteEmployee = async (Employee_Number) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      Employee_Number
    }
  }
  await dynamoClient.delete(params).promise();
  return "Employee Record Successfully Deleted!"
};

module.exports = {
  getEmployees,
  getEmployeeByID,
  deleteEmployee,
  addNewRecords,
  updateEmployee
}