import React from "react";
import PropTypes from "prop-types";
import Features from "../components/Features";
import BlockContent from "../components/BlockContent/BlockContent";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import useCatchMissingData from "../hooks/useCatchPageError.js";

export const query = graphql`
	query VendorPage {
		page: sanityPage(_id: {regex: "/(drafts.|)vendor/"}) {
			title
			_rawBody
		}
	}
`;

export const VendorPage = props => {
	const page = useCatchMissingData(props);

	// VendorPage.propTypes = {
	// 	data: PropTypes.shape({
	// 		title: PropTypes.string,
	// 		_rawBody
	// 	})
	// };

	return (
		<Layout>
			<div className="columns">
				<div className="column">
					<section className="section">
						<div className="container">
							<div className="columns">
								<div className="column is-10 is-offset-1">
									<section className="section">
										<h2 className="title">{page.title}</h2>
										<BlockContent blocks={page._rawBody || []} />
									</section>
								</div>
							</div>
						</div>
					</section>
					{/* <div className="border-top-bottom">
						<section className="hero is-light">
							<div className="hero-body">
								<Features gridItems={data.markdownRemark.frontmatter.vendorList} />
							</div>
						</section>
					</div> */}
				</div>
			</div>
		</Layout>
	);
};

export default VendorPage;

// export const vendorPageQuery = graphql`
// 	query VendorPage($id: String!) {
// 		markdownRemark(id: {eq: $id}) {
// 			html
// 			frontmatter {
// 				title
// 				vendorList {
// 					image
// 					url
// 				}
// 			}
// 		}
// 	}
// `;
