const {format} = require("date-fns");
const {createFilePath} = require("gatsby-source-filesystem");

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createBlogPostPages(graphql, actions, reporter) {
	const {createPage} = actions;
	const result = await graphql(`
		{
			allSanityPost(filter: {slug: {current: {ne: null}}}) {
				edges {
					node {
						id
						title
						publishedAt
						categories {
							id
							title
						}
						slug {
							current
						}
					}
				}
			}
		}
	`);

	if (result.errors) throw result.errors;

	const postEdges = (result.data.allSanityPost || {}).edges || [];

	postEdges.forEach((edge, index) => {
		const {id, slug = {}, publishedAt} = edge.node;
		const dateSegment = format(publishedAt, "YYYY/MM");
		const path = `/blog/${dateSegment}/${slug.current}/`;

		reporter.info(`Creating blog post page: ${path}`);

		createPage({
			path,
			component: require.resolve("./src/templates/blog-post.js"),
			context: {id}
		});
	});
}

// this is creating pages for blog posts and projects only
// no content pages because /pages/ contains js and not markdown?
exports.createPages = async ({graphql, actions, reporter}) => {
	await createBlogPostPages(graphql, actions, reporter);
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
