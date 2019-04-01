const _ = require("lodash");
const path = require("path");
const {createFilePath} = require("gatsby-source-filesystem");

exports.createPages = ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators;

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							tags
							templateKey
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const posts = result.data.allMarkdownRemark.edges;

		posts.forEach(edge => {
			const id = edge.node.id;
			// Esten added: if templateKey exists create a page for the file
			// Used so Gatsby doesn't attempt to create a new page for my index.md file for home page content
			if (edge.node.frontmatter.templateKey) {
				createPage({
					path: edge.node.fields.slug,
					tags: edge.node.frontmatter.tags,
					component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
					// additional data can be passed via context
					context: {
						id
					}
				});
			}
		});

		// Tag pages:
		let tags = [];
		// Iterate through each post, putting all found tags into `tags`
		posts.forEach(edge => {
			if (_.get(edge, `node.frontmatter.tags`)) {
				tags = tags.concat(edge.node.frontmatter.tags);
			}
		});
		// Eliminate duplicate tags
		tags = _.uniq(tags);

		// Make tag pages
		tags.forEach(tag => {
			const tagPath = `/tags/${_.kebabCase(tag)}/`;

			createPage({
				path: tagPath,
				component: path.resolve(`src/templates/tags.js`),
				context: {
					tag
				}
			});
		});
	});
};

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
	const {createNodeField} = boundActionCreators;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({node, getNode});
		createNodeField({
			name: `slug`,
			node,
			value
		});
	}
};

// const axios = require("axios");
// const crypto = require("crypto");

// exports.sourceNodes = async ({boundActionCreators}) => {
// 	const {createNode} = boundActionCreators;
// 	const token = process.env.netlify_access_token;
// 	// fetch raw data from the randomuser api
// 	const getFormSubmissions = () => axios.get(`https://api.netlify.com/api/v1/forms/5c37534061fe65000800e763/submissions?access_token=${token}`);
// 	//curl -H 'User-Agent: Order Submissions (estenpatrick@gmail.com)' https://api.netlify.com/api/v1/sites?access_token=

// 	// await for results
// 	const res = await getFormSubmissions();

// 	// map into these results and create nodes
// 	res.data.map((submission, i) => {
// 		// Create your node object
// 		const submissionNode = {
// 			// Required fields
// 			id: `${i}`,
// 			parent: `__SOURCE__`,
// 			internal: {
// 				type: `FormSubmission` // name of the graphQL query --> allRandomUser {}
// 				// contentDigest will be added just after
// 				// but it is required
// 			},
// 			children: [],

// 			// Other fields that you want to query with graphQl
// 			submission: submission

// 			// etc...
// 		};

// 		// Get content digest of node. (Required field)
// 		const contentDigest = crypto
// 			.createHash(`md5`)
// 			.update(JSON.stringify(submissionNode))
// 			.digest(`hex`);
// 		// add it to submissionNode
// 		submissionNode.internal.contentDigest = contentDigest;

// 		// Create node with the gatsby createNode() API
// 		createNode(submissionNode);
// 	});

// 	return;
// };
