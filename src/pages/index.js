import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="hero-background-image full-height-plus-children">
            <div className="container hero-image-text has-text-grey-dark is-centered is-size-4">
                <div className="columns">
                    <div className="column welcome-pane">
                        <h1>data.welcomeText</h1>
                        <hr />
                        <p>data.aboutText</p>
                    </div>
                    <div className="column">
                        <img src="/img/draperVenetian.jpg" />
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        aboutText
        welcomeText
      }
    }
  }
`
