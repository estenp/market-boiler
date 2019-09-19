import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import BlockContent from "../components/BlockContent/BlockContent";
import {useCatchPageError} from "../hooks/useCatchPageError";

export const servicesPageQuery = graphql`
	query ServicesPage {
		page: sanityPage(_id: {regex: "/(drafts.|)services/"}) {
			title
			_rawBody
		}
	}
`;

export const ServicePageTemplate = ({title, content}) => {
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
										<BlockContent className="content" content={content} />
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

// ServicePageTemplate.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	content: PropTypes.string,
// 	contentComponent: PropTypes.func
// };

const ServicePage = props => {
	const {page} = useCatchPageError(props);

	return <ServicePageTemplate title={page.title} content={page._rawBody} />;
};

ServicePage.propTypes = {
	data: PropTypes.object.isRequired
};

export default ServicePage;
