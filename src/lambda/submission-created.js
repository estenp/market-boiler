const axios = require("axios");
//const fetch = require("node-fetch");
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
		//url: `https://swapi.co/api/people/1/`,
		url: `https://api.github.com/repos/${user}/market-boiler/`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		auth: {
			username: user,
			password: pass
		}
	})
		.then(res => {
			console.log(res);
			callback(null, {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Credentials": "true"
				},
				body: JSON.stringify(res.data)
			});
		})
		.catch(e => {
			console.log(e);
			const error = e.response.data;
			const errorResponse = {
				statusCode: 501,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Credentials": "true"
				},
				body: JSON.stringify({
					message: error
				})
			};
			callback(null, errorResponse);
		});
};
