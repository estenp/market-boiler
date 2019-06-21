const axios = require("axios");
//const fetch = require("node-fetch");
//const crypto = require("crypto");
const token = process.env.netlifyAPIToken;
const githubToken = process.env.githubAPIToken;
const user = process.env.githubUser;
const pass = process.env.githubPass;

exports.handler = (event, context, callback) => {
	console.log(event.body);
	// let buffer = Buffer.from(event.body, "base64");
	// let text = buffer.toString("ascii");

	const eventBodyStr = JSON.stringify(event.body);
	// let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

	axios({
		method: "put",
		url: `https://api.github.com/repos/${user}/market-boiler/contents/src/data/orders/${event.body}`,
		//url: `https://swapi.co/api/people/1/`,
		//url: `https://api.github.com/repos/${user}/market-boiler`,
		headers: {
			"Content-Type": "application/json"
		},
		auth: {
			username: user,
			password: pass
		},
		data: {
			message: "my commit message",
			committer: {
				name: "Testin Esten",
				email: "estenpatrick@gmail.com"
			},
			content: eventBodyStr
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
				body: JSON.stringify("successful")
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
				body: e
			};
			callback(null, errorResponse);
		});
};
