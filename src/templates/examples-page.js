import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'
import ImageGallery from '../components/ImageGallery';

const ExamplesPage = ({ data }) => {
    return (
        <div className="columns">
          <div className="column">
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <section className="section">
                            <h2 className="title">
                                {data.markdownRemark.frontmatter.title}
                            </h2>
                            <HTMLContent className="content" content={data.markdownRemark.html} />
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="hero-body">  
                    <ImageGallery imageUrls={data.markdownRemark.frontmatter.images} />
                </div>
            </section>
          </div>
        </div>
    )
}

ExamplesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ExamplesPage

export const examplesPageQuery = graphql`
  query ExamplesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        images {
            imageUrl
            tag
        }
      }
    }
  }
`
