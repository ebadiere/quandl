require('babel-polyfill');
require('dotenv').config();

axios = require('axios');

const createRequest = (input, callback) => {

    // Performing a GET request
    axios.get('https://www.quandl.com/api/v3/datasets/LBMA/GOLD?column_index=1&rows=1&api_key=' + process.env.API_KEY, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .catch(function (error) {
            callback(500, {
                jobRunID: input.id,
                status: "errored",
                error: "Error querying quandl",
                statusCode: 500
            });
        })
        .then(function(response){
            callback(200, {
                jobRunID: input.id,
                data: response.data.dataset.data[0][1],
                statusCode: 200
            });
        });

};

exports.quandlservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

