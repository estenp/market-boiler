import React from "react";
import PropTypes from "prop-types";

import RadarDataChart from "../../RadarDataChart/RadarDataChart";

export class ProductDetail extends React.Component {
	constructor(props) {
		super(props);

		this.productDetails = this.props.getProductInfoByID(this.props.productID);
	}

	render() {
		const {allProductDetails, orderState, productID} = this.props;
		//var productID = productDetails.id;
		var unitValue = this.props.orderState.products[productID].unit;
		var quantityValue = this.props.orderState.products[productID].quantity;

		// console.log(state, productDetails);

		// 1. should click handler be contained in Cart and emit changes in state up to parent?
		return (
			<div className="columns is-centered">
				{/* {JSON.stringify(productDetails)} */}
				<div className="card">
					<div className="card-header">
						<div className="card-header-title">
							{this.productDetails.title} <br />
							<span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.productDetails.type}</span>
						</div>
					</div>
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={this.productDetails.image} alt="Placeholder image" />
						</figure>
					</div>
					<div className="card-content">
						<div>
							<p>{this.productDetails.description}</p>
						</div>
						{this.productDetails.attributes.effects.length > 0 && <RadarDataChart data={this.productDetails} />}
						<hr />
						<div>
							<label>Unit: </label> <br />
							<select name="unit" value={unitValue} onChange={e => this.props.handleInputChange(productID)}>
								{this.productDetails.availUnits.map((unit, i) => (
									<option key={i} value={unit}>
										{unit}
									</option>
								))}
							</select>
						</div>
						<br />

						<div>
							<label>Quantity: </label> <br />
							<input type="number" name="quantity" value={quantityValue} onChange={e => this.props.handleInputChange(productID)} />
						</div>
					</div>
					<div className="card-footer">
						<a
							className={(this.props.isInCart(productID) ? "is-danger" : "is-primary") + " card-footer-item button"}
							onClick={e => this.props.handleProductAdd(productID)}
							//disabled={this.isDisabled(productID)}
						>
							{this.props.isInCart(productID) ? "Remove From Cart" : "Add to Cart"}
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductDetail;
