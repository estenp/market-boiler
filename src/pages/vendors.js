import React from "react";
import PropTypes from "prop-types";
import Features from "../components/Features";
import BlockContent from "../components/BlockContent/BlockContent";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import {useCatchPageError} from "../hooks/useCatchPageError";

export const query = graphql`
	query VendorPage {
		page: sanityPage(path: {current: {eq: "vendors"}}) {
			title
			_rawBody
		}
	}
`;

export const VendorPage = props => {
	const {page} = useCatchPageError(props);

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
										<BlockContent className="content" blocks={page._rawBody || []} />
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
