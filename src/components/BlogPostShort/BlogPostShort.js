import React from "react";
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
				<Link to={post.fields.slug}>{post.frontmatter.title}</Link>
				<span> &bull; </span>
				<small>{post.frontmatter.date}</small>
			</p>
			<p>
				{post.excerpt}
				<br />
				<br />
				<Link className="button is-small" to={post.fields.slug}>
					Tell Me More! →
				</Link>
				<br />
				<br />
				<br />
				<Link className="is-small" to="/blog-landing/">
					See all blog posts
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
