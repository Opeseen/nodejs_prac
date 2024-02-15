const AWS = require('aws-sdk');
const {randomUUID} = require('crypto');

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Student_Records"

const createStudentRecord = async (studentData) => {
  let newStudentData = studentData;
  newStudentData.id = randomUUID();
  const params = {
    TableName: TABLE_NAME,
    Item: newStudentData
  };
  await dynamoClient.put(params).promise();
  return "Student Records Added Successfully!"
};

const getStudentByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      email
    }
  };
  return await dynamoClient.get(params).promise();
};

const testStudentRecord = (studentData) => {
  let testRecord = studentData
  testRecord.id = randomUUID();
  return testRecord;
};

module.exports = {
  createStudentRecord,
  getStudentByEmail,
  testStudentRecord
};