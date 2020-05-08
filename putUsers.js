'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-west-2"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});
    
    let responseBody = "";
    let statusCode = 0;
    
    const { iduser, nama, nohp, email, alamat, noktp, lokasi_sekarang } = JSON.parse(event.body);
    
    const params = {
        TableName : "User",
        Item: {
            iduser: iduser,
            noktp: noktp,
            nama: nama,
            nohp: nohp,
            email: email,
            alamat: alamat,
            lokasi_sekarang: lokasi_sekarang
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = 'Unable to put User data';
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
