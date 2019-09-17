import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import BlockContent from "../components/BlockContent/BlockContent";
import useCatchPageError from "../hooks/useCatchPageError.js";

export const aboutPageQuery = graphql`
	query AboutPage {
		page: sanityPage(_id: {regex: "/(drafts.|)about/"}) {
			title
			_rawBody
		}
	}
`;

// AboutPageTemplate.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	content: PropTypes.string,
// };

export const AboutPageTemplate = ({title, content}) => {
	return (
		<Layout>
			<section className="section section--gradient">
				<div className="container">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<div className="section">
								<h2 className="title">{title}</h2>
								<BlockContent className="content" content={content} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

// AboutPage.propTypes = {
// 	data: PropTypes.object.isRequired
// };

const AboutPage = ({props}) => {
	const page = useCatchPageError(props);

	return <AboutPageTemplate title={page.title} content={page._rawBody} />;
};

export default AboutPage;
