const axios = require("axios");
const querystring = require("querystring");

const token = process.env.SANITY_WRITE_TOKEN;

// this isn't supporting `const` within the function block??
exports.handler = (event, context, callback) => {
	var params = querystring.parse(event.body);
	console.log(event.body, params);
	const timestamp = Date.now();
	let productDetails;
	//const IDs = Array.isArray(params.productID) ? [...params.productID] : [params.productID];

	// if (Array.isArray(params.productID)) {
	// 	productDetails = params.productID.map((v, i) => {
	// 		return {
	// 			productID: v,
	// 			quantity: params.quantity[i],
	// 			unit: params.unit[i]
	// 		};
	// 	});
	// } else {
	// 	productDetails = [
	// 		{
	// 			productID: params.productID,
	// 			quantity: params.quantity,
	// 			unit: params.unit
	// 		}
	// 	];
	// }

	// var orderJSON = {
	// 	id: timestamp,
	// 	customerEmail: params.email,
	// 	customerFirst: params.firstName,
	// 	customerLast: params.lastName,
	// 	customerPhone: params.phone,
	// 	customerComments: params.comments,
	// 	details: productDetails,
	// 	date: timestamp
	// };
	// console.log(orderJSON);
	// var paramStr = JSON.stringify(params);
	// var eventBodyB64 = Buffer.from(paramStr).toString("base64");

	axios({
		method: "GET",
		url: `https://c7lrcttj.api.sanity.io/v1/data/query/production?query=*[_id=="${params.productID}"]`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		} /* ,
		data: {
			content: "HI"
		} */
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
