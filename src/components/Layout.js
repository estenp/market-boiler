import React from "react";
import Helmet from "react-helmet";
import {StaticQuery, graphql} from "gatsby";
import Navbar from "../components/Navbar/Navbar";
import StatusAlert from "../components/StatusAlert/StatusAlert";

export default ({children}) => (
	<StaticQuery
		query={graphql`
			query StatusAlert {
				markdownRemark(frontmatter: {type: {eq: "alert"}}) {
					html
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						path
						title
						type
					}
				}
			}
		`}
		render={data => (
			<div>
				<Helmet title="Custom Fabricating Industries" />
				<Navbar />
				{!!data && !!data.markdownRemark && <StatusAlert message={data.markdownRemark.html} />}

				<div className="main-container">{children}</div>
			</div>
		)}
	/>
);
