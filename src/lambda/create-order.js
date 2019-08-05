const axios = require("axios");
const querystring = require("querystring");

const user = process.env.githubUser;
const pass = process.env.githubPass;

// this isn't supporting `const` within the function block??
exports.handler = (event, context, callback) => {
	var params = querystring.parse(event.body);
	console.log(event.body, params);
	const timestamp = Date.now();
	let productDetails;
	//const IDs = Array.isArray(params.productID) ? [...params.productID] : [params.productID];

	if (Array.isArray(params.productID)) {
		productDetails = params.productID.map((v, i) => {
			return {
				productID: v,
				quantity: params.quantity[i],
				unit: params.unit[i]
			};
		});
	} else {
		productDetails = [
			{
				productID: params.productID,
				quantity: params.quantity,
				unit: params.unit
			}
		];
	}

	var orderJSON = {
		id: timestamp,
		customerEmail: params.email,
		customerFirst: params.firstName,
		customerLast: params.lastName,
		customerPhone: params.phone,
		customerComments: params.comments,
		details: productDetails,
		date: timestamp
	};
	console.log(orderJSON);
	var paramStr = JSON.stringify(params);
	var eventBodyB64 = Buffer.from(paramStr).toString("base64");

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
			//console.log(params);
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
			console.log("error", e);
			//const error = e.response.data;
			var errorResponse = {
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
