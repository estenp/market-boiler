import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'
import ImageGallery from '../components/ImageGallery';

const ExamplesPage = ({ data }) => {
    return (
        <div className="columns examples-page-container">
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
            <section className="section video-section">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <video height="500" width="300" controls>
                            <source src="/img/IMG_3277.mov" type="video/mp4" />
                        </video>
                    </div>
                    <div className="column is-one-quarter">
                    <iframe height="550" width="100%" src="https://www.youtube.com/embed/mp4pgOTz7wU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </section>
            <hr />
            <section>
                <div className="hero-body">  
                    <ImageGallery images={data.markdownRemark.frontmatter.images} />
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
