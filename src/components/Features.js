import React from 'react'
import PropTypes from 'prop-types'

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline feature-grid">
    {gridItems.map(item => (
      <div key={item.image} className="column is-2 is-one-sixth-widescren is-one-sixth-desktop">
        <section className="section">
          <a className="has-text-centered" href={item.url}>
            <img alt={item.image} src={item.image} />
          </a>
          <p>{item.text}</p>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default FeatureGrid
