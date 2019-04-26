import React from "react";
import "./ProductCard.module.scss";

export default class ProductCard extends React.Component {
	constructor(props) {
		super(props);

		this.isInCart.bind(this);
		this.isDisabled.bind(this);
	}

	isDisabled(productID) {
		return this.props.productState[productID].quantity == "";
	}

	isInCart(productID) {
		return this.props.cart.indexOf(productID) === -1 ? false : true;
	}

	render() {
		var productID = this.props.productID;
		var unitValue = this.props.productState[productID].unit;
		var quantityValue = this.props.productState[productID].quantity;
		return (
			<div key={productID} className="column">
				<div className="card" styleName={this.isInCart(productID) ? "isInCart" : ""}>
					<div className="card-header">
						<div className="card-header-title">
							{this.props.productData.title} <br />
							<span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.props.productData.type}</span>
						</div>
					</div>
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={this.props.productData.image} alt="Placeholder image" />
						</figure>
					</div>
					<div className="card-content">
						<div styleName="product-description">
							<p>{this.props.productData.description}</p>
						</div>
						<hr />
						<div>
							<label>Unit: </label> <br />
							<select name="unit" value={unitValue} onChange={this.props.handleChange.bind(this, productID)}>
								{this.props.productData.availUnits.map((unit, i) => (
									<option key={i} value={unit}>
										{unit}
									</option>
								))}
							</select>
						</div>
						<br />

						<div>
							<label>Quantity: </label> <br />
							<input type="number" name="quantity" value={quantityValue} onChange={this.props.handleChange.bind(this, productID)} />
						</div>
					</div>
					<div className="card-footer">
						<a
							className={(this.isInCart(productID) ? "is-danger" : "is-primary") + " card-footer-item button"}
							onClick={this.props.handleClick.bind(this, productID)}
							//disabled={this.isDisabled(productID)}
						>
							{this.isInCart(productID) ? "Remove From Cart" : "Add to Cart"}
						</a>
					</div>
				</div>
			</div>
		);
	}
}
