const finnhub = require('finnhub');
const keys = require('./keys');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = keys.finhubApi;
finhubClient = new finnhub.DefaultApi();

module.exports = finhubClient;
