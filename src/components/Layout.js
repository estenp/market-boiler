import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import { StaticQuery, graphql } from "gatsby";
import Navbar from "../components/Navbar";
import StatusAlert from "../components/StatusAlert.js";

export default ({ children }) => (
    <StaticQuery
        query={graphql`
            query StatusAlert {
                markdownRemark(frontmatter: { type: { eq: "alert" } }) {
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
            <Layout>
                <div>
                    <Helmet title="Custom Fabricating Industries" />
                    <Navbar />
                    {!!data && !!data.markdownRemark && (
                        <StatusAlert message={data.markdownRemark.html} />
                    )}
                    <div className="main-container">{children}</div>
                </div>
            </Layout>
        )}
    />
);
