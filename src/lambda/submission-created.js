const axios = require("axios");
const crypto = require("crypto");
const token = process.env.netlify_access_token;

// exports.subs = async () => {
// 	// await for results
// 	//const res = await getFormSubmissions();
// 	//console.log(res.data);
// };

exports.handler = function(event, context, callback) {
	// fetch raw data from the randomuser api
	const getFormSubmissions = () =>
		axios
			.get(`https://api.netlify.com/api/v1/forms/5c37534061fe65000800e763/submissions?access_token=${token}`)
			.then(res => {
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(res.data)
				});
			})
			.catch(err => {
				callback(err);
			});
};
