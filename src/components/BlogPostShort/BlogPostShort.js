import React from "react";
import {render} from "react-dom";
import {Link} from "gatsby";
import PropTypes from "prop-types";

const BlogPostShort = ({post}) => (
	<div className="">
		<div
			className="content"
			style={{
				border: "1px solid #eaecee",
				padding: "2em 4em"
			}}
			key={post.id}
		>
			<p>
				<Link className="has-text-primary" to={post.fields.slug}>
					{post.frontmatter.title}
				</Link>
				<span> &bull; </span>
				<small>{post.frontmatter.date}</small>
			</p>
			<p>
				{post.excerpt}
				<br />
				<br />
				<Link className="button is-small" to={post.fields.slug}>
					Keep Reading →
				</Link>
			</p>
		</div>
	</div>
);

BlogPostShort.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			plan: PropTypes.string,
			price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			description: PropTypes.string,
			items: PropTypes.array
		})
	)
};

export default BlogPostShort;

// export const pageQuery = graphql`
// 	query BlogPostShort($id: String!) {
// 		markdownRemark(id: {eq: $id}) {
// 			id
// 			html
// 			frontmatter {
// 				date(formatString: "MMMM DD, YYYY")
// 				title
// 				description
// 				tags
// 			}
// 		}
// 	}
// `;
