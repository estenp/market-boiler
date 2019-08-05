import React from "react";
import {Link} from "gatsby";
import PropTypes from "prop-types";
import "./BlogPostShort.module.scss";

const BlogPostShort = ({post}) => (
	<div className="">
		<div
			className=""
			style={{
				border: "1px solid #eaecee",
				//padding: "2em 4em"
				boxShadow: "0px 5px 10px lightgrey"
			}}
			key={post.id}
		>
			<section>
				<header styleName="header">
					<Link to={post.fields.slug}>
						<h1 className="title is-5 has-text-light">{post.frontmatter.title}</h1>
					</Link>
					<time className="subtitle is-6 has-text-light" datetime={post.frontmatter.date}>
						{post.frontmatter.date}
					</time>
				</header>
				<article className="section">
					<section>
						<p className="content">{post.excerpt}</p>
						<Link className="button is-small" to={post.fields.slug}>
							Tell Me More! →
						</Link>
						<footer styleName="footer">
							<Link className="is-small" to="/blog-landing/">
								See all blog posts
							</Link>
						</footer>
					</section>
				</article>
			</section>
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
