import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import BlogPostShort from "../components/BlogPostShort/BlogPostShort";
import useCatchPageError from "../hooks/useCatchPageError";

export const query = graphql`
	query HomePage {
		page: sanityPage(path: {current: {eq: "home"}}) {
			title
			_rawBody
		}
	}
`;

export default class IndexPage extends React.Component {
	render() {
		// const {data} = this.props;
		// const page = useCatchMissingData(this.props);

		// const {edges: posts} = data.blogPost;
		// const {edges: indexPageData} = data.indexPage;

		return (
			<Layout>
				<div className="hero-background-image full-height-plus-children">
					<div className="container hero-image-text has-text-grey-dark is-centered">
						<div className="side-by-side columns">
							<div className="column text-pane">
								{/* <h1>{indexPageData[0].node.frontmatter.welcomeText}</h1> */}

								<hr />
								{/* <p>{indexPageData[0].node.frontmatter.aboutText}</p> */}
							</div>

							{/* <BlogPostShort post={posts[0].node} /> */}
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

// IndexPage.propTypes = {
// 	data: PropTypes.shape({
// 		markdownRemark: PropTypes.shape({
// 			frontmatter: PropTypes.object
// 		})
// 	})
// };

// export const pageQuery = graphql`
// 	query IndexQuery {
// 		blogPost: allMarkdownRemark(limit: 1, sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
// 			edges {
// 				node {
// 					excerpt(pruneLength: 400)
// 					id
// 					fields {
// 						slug
// 					}
// 					frontmatter {
// 						title
// 						templateKey
// 						date(formatString: "MMMM DD, YYYY")
// 					}
// 				}
// 			}
// 		}

// 		indexPage: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src.pages.index.md/"}}) {
// 			edges {
// 				node {
// 					frontmatter {
// 						title
// 						aboutText
// 						welcomeText
// 					}
// 				}
// 			}
// 		}
// 	}
// `;
