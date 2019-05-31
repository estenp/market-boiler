import React from "react";
import PropTypes from "prop-types";

import RadarDataChart from "../../RadarDataChart/RadarDataChart";

export class ProductDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {productDetails, shopState} = this.props;
		var productID = productDetails.id;
		var unitValue = this.props.shopState.products[productID].unit;
		var quantityValue = this.props.shopState.products[productID].quantity;

		// console.log(state, productDetails);

		// 1. should click handler be contained in Cart and emit changes in state up to parent?
		return (
			<div className="columns is-centered">
				{/* {JSON.stringify(productDetails)} */}
				<div className="card">
					<div className="card-header">
						<div className="card-header-title">
							{productDetails.title} <br />
							<span className="is-italic has-text-weight-light has-text-light has-text-primary">{productDetails.type}</span>
						</div>
					</div>
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={productDetails.image} alt="Placeholder image" />
						</figure>
					</div>
					<div className="card-content">
						<div>
							<p>{productDetails.description}</p>
						</div>
						{productDetails.attributes.effects.length > 0 && <RadarDataChart data={productDetails} />}
						<hr />
						<div>
							<label>Unit: </label> <br />
							<select name="unit" value={unitValue} onChange={this.handleInputChange.bind(this, productID)}>
								{productDetails.availUnits.map((unit, i) => (
									<option key={i} value={unit}>
										{unit}
									</option>
								))}
							</select>
						</div>
						<br />

						<div>
							<label>Quantity: </label> <br />
							<input type="number" name="quantity" value={quantityValue} onChange={this.handleInputChange.bind(this, productID)} />
						</div>
					</div>
					<div className="card-footer">
						{/* <a
                            className={(this.isInCart(productID) ? "is-danger" : "is-primary") + " card-footer-item button"}
                            onClick={this.handleClick.bind(this, productID)}
                            //disabled={this.isDisabled(productID)}
                        >
                            {this.isInCart(productID) ? "Remove From Cart" : "Add to Cart"}
                        </a> */}
					</div>
				</div>
			</div>
		);
	}
}

export default ProductDetail;
