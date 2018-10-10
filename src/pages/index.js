import React from 'react'
import PropTypes from 'prop-types'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <div className="hero-background-image full-height-plus-children">
            <div className="container hero-image-text has-text-grey-dark is-centered">
                <div className="columns">
                    <div className="column welcome-pane">
                        <h1>{data.markdownRemark.frontmatter.welcomeText}</h1>
                        <hr />
                        <p>{data.markdownRemark.frontmatter.aboutText}</p>
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
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export const pageQuery = graphql`
  query IndexQuery {
    markdownRemark {
      frontmatter {
        title
        aboutText
        welcomeText
      }
    }
  }
`
