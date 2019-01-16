import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import "../global-styles/styles.sass";

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props;
        console.log(data);
        return (
            <Layout>
                <div className="hero-background-image full-height-plus-children">
                    <div className="container hero-image-text has-text-grey-dark is-centered">
                        <div className="side-by-side columns">
                            <div className="column text-pane">
                                <h1>
                                    {
                                        data.allMarkdownRemark.edges[0].node
                                            .frontmatter.welcomeText
                                    }
                                </h1>

                                <hr />
                                <p>
                                    {
                                        data.allMarkdownRemark.edges[0].node
                                            .frontmatter.aboutText
                                    }
                                </p>
                            </div>
                            <div
                                id="homepage-image"
                                className="column image-pane"
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/src.pages.index.md/" } }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        aboutText
                        welcomeText
                    }
                }
            }
        }
    }
`;
