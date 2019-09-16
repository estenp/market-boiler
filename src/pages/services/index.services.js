import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../../components/Content";
import {graphql} from "gatsby";
import Layout from "../../components/Layout";
export const ServicePageTemplate = ({title, content, contentComponent}) => {
	const PageContent = contentComponent || Content;

	return (
		<Layout>
			<section className="section section--gradient">
				<div className="container">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<div className="section">
								<h2 className="title">{title}</h2>
								<div className="side-by-side columns">
									<div className="column text-pane">
										<PageContent className="content" content={content} />
									</div>
									<div id="service-page-image" className="column image-pane">
										<iframe
											width="100%"
											height="100%"
											title="youtube video"
											src="https://www.youtube.com/embed/mp4pgOTz7wU"
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

ServicePageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const ServicePage = ({data}) => {
	const {markdownRemark: post} = data;

	return <ServicePageTemplate contentComponent={HTMLContent} title={post.frontmatter.title} content={post.html} />;
};

ServicePage.propTypes = {
	data: PropTypes.object.isRequired
};

export default ServicePage;

export const servicePageQuery = graphql`
	query ServicePage($id: String!) {
		markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				title
			}
		}
	}
`;
