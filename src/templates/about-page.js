import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || Content;

    return (
        <Layout>
            <section className="section section--gradient">
                <div className="container">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <div className="section">
                                <h2 className="title">{title}</h2>
                                <PageContent
                                    className="content"
                                    content={content}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <AboutPageTemplate
            contentComponent={HTMLContent}
            title={post.frontmatter.title}
            content={post.html}
        />
    );
};

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
