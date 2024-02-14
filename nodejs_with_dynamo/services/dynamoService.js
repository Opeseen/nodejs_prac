const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Student_Records"

const createStudentRecord = async (studentData) => {
  const params = {
    TableName: TABLE_NAME,
    Item: studentData
  };
  await dynamoClient.put(params).promise();
  return "Student Records Added Successfully!"
};

const testStudentRecord = (studentData) => {
  let testRecord = studentData
  testRecord.id = "12"
  return testRecord;
};

module.exports = {
  createStudentRecord,
  testStudentRecord
};