const axios = require("axios");

const user = process.env.githubUser;
const pass = process.env.githubPass;

exports.handler = (event, context, callback) => {
	var eventBodyB64 = Buffer.from(event.body).toString("base64");

	axios({
		method: "PUT",
		url: `https://api.github.com/repos/${user}/market-boiler/contents/src/data/orders/${Date.now()}`,
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
			content: eventBodyB64
		}
	})
		.then(res => {
			console.log(event);
			callback(null, {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Credentials": "true"
				},
				body: "successful"
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
