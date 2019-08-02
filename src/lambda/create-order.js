const axios = require("axios");
const querystring = require("querystring");

const user = process.env.githubUser;
const pass = process.env.githubPass;

exports.handler = (event, context, callback) => {
	const params = querystring.parse(event.body);

	// let orderJSON = {
	// 	id: event.body.id,
	// 	customerEmail: event.body.data.email,
	// 	customerFirst: event.body.data.firstName,
	// 	customerLast: event.body.data.lastName,
	// 	customerPhone: event.body.data.phone,
	// 	customerComments: event.body.data.comments,
	// 	product: event.body.data.product,
	// 	product: event.body.data.quantity,
	// 	product: event.body.data.units,
	// 	date: event.body.order_date
	// };
	var eventBodyB64 = Buffer.from(params).toString("base64");

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
			console.log(params);
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
