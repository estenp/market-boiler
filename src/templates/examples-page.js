import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

const ExamplesPage = ({ data }) => {

  return (
    <div>{data.frontmatter.title}</div>
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
        path
        images
      }
    }
  }
`
