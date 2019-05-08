const axios = require("axios");
//const fetch = require("node-fetch");
//const crypto = require("crypto");
const token = process.env.netlifyAPIToken;
const githubToken = process.env.githubAPIToken;
const user = process.env.githubUser;
const pass = process.env.githubPass;

exports.handler = (event, context, callback) => {
	let decodedEvent = Buffer.from(event.body, "base64").toString("ascii");

	//let text = buffer.toString("ascii");
	// console.log(`EVENT BODY: `);
	// console.log(event.payload);
	/* callback(null, {
		headers: {
			"Content-Type": "application/json"
		},
		statusCode: 200,
		body: event.body
	}); */

	// let objJsonStr = JSON.stringify(event.body);
	// let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
	//const {payload} = JSON.parse(text);
	console.log(event.body);

	axios({
		method: "get",
		//url: `https://api.github.com/repos/${user}/market-boiler/contents/src/data/orders/${event.body}.txt`,
		//url: `https://swapi.co/api/people/1/`,
		url: `https://api.github.com/repos/${user}/market-boiler`,
		headers: {
			"Content-Type": "application/json"
		},
		auth: {
			username: user,
			password: pass
		} /* ,
		data: {
			message: "my commit message",
			committer: {
				name: "Testin Esten",
				email: "estenpatrick@gmail.com"
			},
			content: JSON.stringify(event.body)
		}*/
	})
		.then(res => {
			//console.log(event.body);
			//console.log(context);
			callback(null, {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Credentials": "true"
				},
				body: JSON.stringify(event.body.payload)
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
