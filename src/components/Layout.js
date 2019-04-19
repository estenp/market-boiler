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
				<Helmet title="The Dispense Report">
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
						integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
						crossorigin="anonymous"
					/>
				</Helmet>
				<Navbar />
				{!!data && !!data.markdownRemark && <StatusAlert message={data.markdownRemark.html} />}

				<div className="main-container">{children}</div>
			</div>
		)}
	/>
);
