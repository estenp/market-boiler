import React from 'react'
import PropTypes from 'prop-types'


const ImageGallery = ({ imageUrls }) => (
  <div className="columns wrap">
    {imageUrls.map((image, index) => (
      <div key={index} className="column is-one-quarter-desktop is-half-tablet">
        <img src={image.imageUrl} />
      </div>
    ))}
  </div>
)

ImageGallery.propTypes = {
  imageUrls: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string
    })
  ),
}

export default ImageGallery
