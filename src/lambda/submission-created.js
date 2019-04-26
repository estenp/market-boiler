const axios = require("axios");
//const crypto = require("crypto");
const token = process.env.netlifyAPIToken;

exports.handler = (event, context, callback) => {
	axios
		// this is getting current form submissions for example.. will be making a post ? to add a submisson
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
