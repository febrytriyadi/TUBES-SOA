'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-west-2"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});
    
    let responseBody = "";
    let statusCode = 0;
    
    const { iduser } = event.pathParameters;
    
    const params = {
        TableName : "User",
        Key: {
            iduser: iduser
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    } catch (err) {
        responseBody = 'Unable to get User data';
        statusCode = 403;
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
        
    }
    return response;
};
