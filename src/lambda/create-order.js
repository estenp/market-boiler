const axios = require("axios");
const querystring = require("querystring");
// const token = process.env.SANITY_WRITE_TOKEN;

// need to remove this
const token =
	"skgVwmHAL4cnhjgr586wy4WYh5Z7PLzFm4z9p5C4ROR1eBPcxMgO3DLciUj3JqkZO3kXSg9qja8oOjnebsKW4EoLXn6gNmeYi1HjRlml8SnqjJd8BquuVydZrMoxOs3MtbPAltT0Xyk2sKWk3AacL6nn7CI5TNK13Tr7UCLTTPtJuc8USze3";

// this isn't supporting `const` within the function block??
exports.handler = (event, context, callback) => {
	let params = querystring.parse(event.body);
	// console.log(params);

	// get product info for items in cart to get proper prices
	axios({
		method: "GET",
		url: `https://c7lrcttj.api.sanity.io/v1/data/query/production?query=*[_id in ${JSON.stringify(params.productID)}]{_id, name, options}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => {
			// console.log("responst", res);
			const orderObj = buildOrder(res, params);
			submitOrder(orderObj);
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
			// console.log("error", e);
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

	// calculateTotal(); - will need this especially if promo's are implemented
	function buildOrder(response, formData) {
		let productsData = response.data.result;
		let order = {
			_type: "order",
			first: formData.firstName,
			last: formData.lastName,
			email: formData.email,
			phone: formData.phone,
			comments: formData.comments,
			orderDetails: formData.productID.map((id, i) => {
				return {
					_key: id,
					_type: "orderDetails",
					productReference: {
						_type: "productReference",
						product: {
							_type: "reference",
							_ref: id
						},
						unit: {
							_key: getProdOptionsInfoByUnitKey(productsData, formData.unitKey[i])._key,
							_type: "productOption",
							unitType: getProdOptionsInfoByUnitKey(productsData, formData.unitKey[i]).unitType,
							unitPrice: getProdOptionsInfoByUnitKey(productsData, formData.unitKey[i]).unitPrice
						}
					},
					// quantity: formData.quantity[i],
					quantity: parseFloat(formData.quantity[i]),
					total: calculateTotal(productsData, formData.unitKey[i], formData.quantity[i])
				};
			})
		};

		order["grandTotal"] = order.orderDetails.reduce((total, obj) => {
			Math.round((obj.total + total) * 100 + Number.EPSILON) / 100;
		}, 0);

		console.log("order", order);

		return order;
	}

	function getProdOptionsInfoByUnitKey(productsData, unitKey) {
		return productsData
			.reduce((arr, prodObj) => {
				// console.log(prodObj.options.flat());
				return [...arr, prodObj.options].flat();
			}, [])
			.find(option => option._key === unitKey);
	}

	function calculateTotal(productsData, unitKey, quantity) {
		return Math.round(getProdOptionsInfoByUnitKey(productsData, unitKey).unitPrice * quantity * 100 + Number.EPSILON) / 100;
	}

	function submitOrder(order) {
		// post request with order data
		const mutations = {
			mutations: [
				{
					create: order
				}
			]
		};

		axios({
			method: "POST",
			url: `https://c7lrcttj.api.sanity.io/v1/data/mutate/production`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			data: JSON.stringify(mutations)
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
	}
};
