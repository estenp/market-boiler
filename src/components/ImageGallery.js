import React from 'react'
import PropTypes from 'prop-types'

const ImageGallery = ({ imageUrls }) => (
  <div className="columns">
    {imageUrls.map(image => (
      <div key={image.imgUrl} className="column is-one-quarter-desktop is-one-half-tablet">
        <Image src={image.imgUrl} />
      </div>
    ))}
  </div>
)

ImageGallery.propTypes = {
  imageUrls: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string
    })
  ),
}

export default ImageGallery
