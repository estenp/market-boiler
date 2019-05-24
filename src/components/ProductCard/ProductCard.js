import React from "react";
import "./ProductCard.module.scss";
import RadarDataChart from "../RadarDataChart/RadarDataChart";
import {Link} from "gatsby";

export default class ProductCard extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.isInCart.bind(this);
		this.isDisabled.bind(this);
	}

	isDisabled(productID) {
		return this.props.state.products[productID].quantity == "";
	}

	isInCart(productID) {
		return this.props.state.cart.indexOf(productID) === -1 ? false : true;
	}

	render() {
		var productID = this.props.productDetails.id;
		var unitValue = this.props.state.products[productID].unit;
		var quantityValue = this.props.state.products[productID].quantity;

		return (
			<div key={productID} className="column">
				<div className="card" styleName={this.isInCart(productID) ? "isInCart" : ""}>
					<Link to={`/product/`} state={{locationData: JSON.stringify(this.props)}}>
						<div className="card-header">
							<div className="card-header-title">
								{this.props.productDetails.title} <br />
								<span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.props.productDetails.type}</span>
							</div>
						</div>
					</Link>
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={this.props.productDetails.image} alt="Placeholder image" />
						</figure>
					</div>
					<div className="card-content">
						<div styleName="product-description">
							<p>{this.props.productDetails.description}</p>
						</div>
						{this.props.productDetails.attributes.effects.length > 0 && <RadarDataChart data={this.props.productDetails} />}
						<hr />
						<div>
							<label>Unit: </label> <br />
							<select name="unit" value={unitValue} onChange={this.props.handleChange.bind(this, productID)}>
								{this.props.productDetails.availUnits.map((unit, i) => (
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
