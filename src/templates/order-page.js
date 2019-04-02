import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
export const OrderPageTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || Content;

    return (
        <Layout>
            <section className="section section--gradient">
                <div className="container">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <section className="section">
                                <h2 className="title">{title}</h2>
                                <div>
                                    <PageContent
                                        className="content"
                                        content={content}
                                    />
                                </div>
                            </section>
                            <section>
                                <form
                                    name="order"
                                    method="POST"
                                    netlify-honeypot="bot-field"
                                    data-netlify="true"
                                >
                                    <p className="hidden">
                                        <label>
                                            Don’t fill this out if you're human:{" "}
                                            <input name="bot-field" />
                                        </label>
                                    </p>
                                    <input
                                        type="hidden"
                                        name="form-name"
                                        value="order"
                                    />
                                    <div className="field">
                                        <label className="label">Name: </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Email: </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="email"
                                                id="email"
                                                name="email"
                                                title="Must be a valid email format."
                                                placeholder="joe@gmail.com"
                                                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                                size="30"
                                                required
                                            />
                                        </div>
                                        <p className="help">
                                            Must be a valid email format.
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label className="label">Phone: </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                title="10 digit phone number."
                                            />
                                        </div>
                                        <p className="help">E.g. 1234567789</p>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Message:{" "}
                                        </label>
                                        <div className="control">
                                            <textarea
                                                className="textarea"
                                                name="message"
                                                id="message"
                                            />
                                        </div>
                                    </div>
                                    <div data-netlify-recaptcha />
                                    <button type="submit" className="button">
                                        Submit
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

OrderPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
};

const OrderPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <OrderPageTemplate
            contentComponent={HTMLContent}
            title={post.frontmatter.title}
            content={post.html}
        />
    );
};

OrderPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default OrderPage;

export const OrderPageQuery = graphql`
    query OrderPage($id: String!) {
        orderPage: markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }

        products: allMarkdownRemark(limit: 1, sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
			edges {
				node {
					excerpt(pruneLength: 400)
					id
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						date(formatString: "MMMM DD, YYYY")
					}
				}
			}
		}
    }
`;
