'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-west-2"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});
    
    let responseBody = "";
    let statusCode = 0;
    
    const { iduser, alamat, nama, nohp, noktp, email, lokasi_sekarang } = JSON.parse(event.body);
    
    const params = {
        TableName : "User",
        Key: {
            iduser: iduser
        },
        UpdateExpression: "set alamat = :n",
        ExpressionAttributeValues: {
            ":n": alamat
        },
        UpdateExpression: "set nama = :n",
        ExpressionAttributeValues: {
            ":n": nama
        },
        UpdateExpression: "set nohp = :n",
        ExpressionAttributeValues: {
            ":n": nohp
        },
        UpdateExpression: "set noktp = :n",
        ExpressionAttributeValues: {
            ":n": noktp
        },
        UpdateExpression: "set email = :n",
        ExpressionAttributeValues: {
            ":n": email
        },
        UpdateExpression: "set lokasi_sekarang = :n",
        ExpressionAttributeValues: {
            ":n": lokasi_sekarang
        },
        ReturnValues: "UPDATE_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = 'Unable to update Pengiriman data';
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
