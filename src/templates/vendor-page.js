import React from 'react'
import PropTypes from 'prop-types'
import Features from '../components/Features'
import Content from '../components/Content'

export const VendorPage = ({ data }) => {

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
                            </section>
                        </div>
                    </div>
                </div>
            </section>
              <Content className="content" content={data.markdownRemark.html} />
              <section className="hero is-light">
                <div className="hero-body">  
                    <Features gridItems={data.markdownRemark.frontmatter.vendorList} />
                </div>
              </section>

          </div>
        </div>


  )
}

VendorPage.propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape({
        frontmatter: PropTypes.object,
      }),
    }),
  }

export default VendorPage

export const vendorPageQuery = graphql`
query VendorPage($id: String!) {
  markdownRemark(id: { eq: $id }) {
    html
    frontmatter {
      title
      vendorList {
          image
          url
      }
    }
  }
}
`