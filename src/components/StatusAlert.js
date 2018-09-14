import React from 'react'
import PropTypes from 'prop-types'


const StatusAlert = (props) => (
  <div className="status-alert">
      {props.message}
  </div>
)

Pricing.propTypes = {
    message: PropTypes.string
  }

export default StatusAlert
