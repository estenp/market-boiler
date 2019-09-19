import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import useCatchPageError from "../hooks/useCatchPageError";

export default class BlogLanding extends React.Component {
	render() {
		const page = useCatchPageError(this.props);
		console.log("page:", page);

		return (
			<Layout>
				<section className="section">
					<div className="container">
						<div className="content">
							<h2 className="title">Latest Stories</h2>
						</div>
						{page.posts.map(({node: post}) => (
							<div
								className="content"
								style={{
									border: "1px solid #eaecee",
									padding: "2em 4em"
								}}
								key={post.id}
							>
								<p>
									<Link className="has-text-primary" to={post.slug.current}>
										{post.title}
									</Link>
									<span> &bull; </span>
									<small>{post.frontmatter.date}</small>
								</p>
								<p>
									{/* {post.excerpt} */}
									<br />
									<br />
									<Link className="button is-small" to={post.slug.current}>
										Keep Reading →
									</Link>
								</p>
							</div>
						))}
					</div>
				</section>
			</Layout>
		);
	}
}

// BlogLanding.propTypes = {
// 	data: PropTypes.shape({
// 		allMarkdownRemark: PropTypes.shape({
// 			edges: PropTypes.array
// 		})
// 	})
// };

export const pageQuery = graphql`
	query BlogLandingQuery {
		posts: allSanityPost(limit: 12, sort: {fields: [publishedAt], order: DESC}) {
			edges {
				node {
					_id
					author {
						id
					}
					title
					categories {
						id
					}
					_rawBody
					publishedAt
					mainImage {
						asset {
							_id
						}
					}
					slug {
						current
					}
				}
			}
		}
	}
`;
