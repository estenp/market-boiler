const axios = require("axios");
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
		url: `https://api.github.com/repos/${user}/market-boiler/`,
		headers: {
			Authorization: `Bearer ${githubToken}`,
			"Content-Type": "application/json"
		},
		auth: {
			username: user,
			password: pass
		} /*,
		data: {
			message: "my commit message",
			committer: {
				name: "Esten",
				email: "estenpatrick@gmail.com"
			},
			content: "bXkgbmV3IGZpbGUgY29udGVudHM="
		}*/
	})
		.then(res => {
			callback(null, {
				statusCode: 200,
				body: JSON.stringify(res.data)
			});
		})
		.catch(err => {
			callback(err);
		});
	// axios
	// 	// this is getting current form submissions for example.. will be making a post ? to add a submisson
	// 	.get(`https://api.netlify.com/api/v1/forms/5c37534061fe65000800e763/submissions?access_token=${token}`)
	// 	.then(res => {
	// 		callback(null, {
	// 			statusCode: 200,
	// 			body: JSON.stringify(res.data)
	// 		});
	// 	})
	// 	.catch(err => {
	// 		callback(err);
	// 	});
};
