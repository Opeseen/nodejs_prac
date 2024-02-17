const AWS = require('aws-sdk');
const {randomUUID} = require('crypto');

// CONFIGURATION SECTION

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Student_Records"

// QUERY SECTION

const createStudentRecord = async (studentData) => {
  let newStudentData = studentData;
  newStudentData.id = randomUUID();
  newStudentData.email = newStudentData.email.toLowerCase();
  const params = {
    TableName: TABLE_NAME,
    Item: newStudentData
  };
  await dynamoClient.put(params).promise();
  return "Student Record Added Successfully!"
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

const getAllStudentInfo = async() => {
  const params = {
    TableName: TABLE_NAME,
  };
  return await dynamoClient.scan(params).promise();
};

const updateStudentRecord = async (data,email) => {
  for (const x in data){
    const params = {
      TableName: TABLE_NAME,
      Key: {
        email
      },
      UpdateExpression: `set ${x} = :X`,
      ExpressionAttributeValues: {
        ':X' : `${data[x]}`
      },
      ConditionExpression: `attribute_exists(email)`,
    };
    await dynamoClient.update(params).promise();
  };

  return "Student data updated successfully";
};

const deleteStudentRecord = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      email
    }
  };
  await dynamoClient.delete(params).promise();
};

module.exports = {
  createStudentRecord,
  getStudentByEmail,
  getAllStudentInfo,
  updateStudentRecord,
  deleteStudentRecord
};