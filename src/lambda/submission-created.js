// const axios = require("axios");
// //const fetch = require("node-fetch");
// //const crypto = require("crypto");
// const token = process.env.netlifyAPIToken;
// const githubToken = process.env.githubAPIToken;
// const user = process.env.githubUser;
// const pass = process.env.githubPass;

exports.handler = (event, context, callback) => {
	console.log(event);
	console.log(event.body);
};
