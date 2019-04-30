const axios = require("axios");
//const crypto = require("crypto");
const token = process.env.netlifyAPIToken;
const githubToken = process.env.githubAPIToken;
const user = process.env.githubUser;
const pass = process.env.githubPass;

exports.handler = (event, context, callback) => {
	console.log(event);

	axios({
		method: "get",
		//url: `https://api.github.com/repos/${user}/repo/market-boiler/src/data/orders/${event.form_id}`,
		url: `https://api.github.com/repos/${user}/market-boiler/`,
		headers: {
			Authorization: `Bearer ${githubToken}`,
			"Content-Type": "application/json"
		}
	})
		.then(function() {
			const response = {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*", // Required for CORS support to work
					"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
				},
				body: JSON.stringify({
					message: "Successfully got repo info!"
				})
			};
			callback(null, response);
		})
		.catch(e => {
			const error = e.response.data;
			const errorResponse = {
				statusCode: error.status,
				headers: {
					"Access-Control-Allow-Origin": "*", // Required for CORS support to work
					"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
				},
				body: JSON.stringify({
					message: error.title
				})
			};
			callback(null, errorResponse);
		});
};
