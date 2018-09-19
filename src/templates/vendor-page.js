import React from 'react'
import PropTypes from 'prop-types'
import Features from '../components/Features'
import Content from '../components/Content'

export const VendorPage = ({ data }) => {

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title">
                {data.markdownRemark.frontmatter.title}
              </h2>
              <Content className="content" content={data.markdownRemark.html} />
              <Features gridItems={data.markdownRemark.frontmatter.vendorList} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
      }
    }
  }
}
`