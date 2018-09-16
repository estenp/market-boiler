import React from 'react'
import PropTypes from 'prop-types'
import HTMLContent from './Content.js'

const StatusAlert = (props) => (
  <div className="status-alert">
    <div className="container">
        <div dangerouslySetInnerHTML={{ __html: props.message }} />
        {/* TODO */}
        {/* <a>Read more...</a> */}
    </div>
  </div>
)

StatusAlert.propTypes = {
    message: PropTypes.string
  }

export default StatusAlert
