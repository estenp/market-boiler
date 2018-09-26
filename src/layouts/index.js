import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import StatusAlert from '../components/StatusAlert.js'
import './all.sass'

const TemplateWrapper = ({ children, data }) => {
    return (
        <div>
            <Helmet title="Custom Fabricating Industries" />
            <Navbar />
            {!!data && !!data.markdownRemark && <StatusAlert message={data.markdownRemark.html} />}
            <div className="main-container">{children()}</div>
        </div>
    )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const newestStatusAlertQuery = graphql`
query StatusAlert {
  markdownRemark(frontmatter: { type: { eq: "alert" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        type
      }
    }
}
`