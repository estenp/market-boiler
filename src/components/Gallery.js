import React from 'react'
import PropTypes from 'prop-types'

const ImageGallery = ({ data }) => (
  <div className="columns">
    {data.map(image => (
      <div key={image.imgUrl} className="column is-one-quarter-desktop is-one-half-tablet">
        <Image src={image.imgUrl} />
      </div>
    ))}
  </div>
)

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      plan: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      items: PropTypes.array,
    })
  ),
}

export default ImageGallery
