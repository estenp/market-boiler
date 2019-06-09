import React from "react";
import PropTypes from "prop-types";
import ProductCard from "../../ProductCard/ProductCard";

import RadarDataChart from "../../RadarDataChart/RadarDataChart";

export class ProductDetail extends React.Component {
	constructor(props) {
		super(props);

		this.productDetails = this.props.getProductInfoByID(this.props.productID);
	}

	render() {
		return (
			<ProductCard
				key={this.productDetails.id}
				productDetails={this.productDetails}
				productState={this.props.orderState.products}
				isInCart={this.props.isInCart(this.productDetails.id)}
				handleClick={this.props.handleProductAdd}
				handleChange={this.props.handleInputChange}
				location={this.props.location}
			/>
		);

		// return (
		// 	<div className="card">
		// 		<div className="card-header">
		// 			<div className="card-header-title">
		// 				{this.productDetails.title} <br />
		// 				<span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.productDetails.type}</span>
		// 			</div>
		// 		</div>
		// 		<div className="card-image">
		// 			<figure className="image is-4by3">
		// 				<img src={this.productDetails.image} alt="Placeholder image" />
		// 			</figure>
		// 		</div>
		// 		<div className="card-content">
		// 			<div>
		// 				<p>{this.productDetails.description}</p>
		// 			</div>

		// 			{this.productDetails.attributes.effects.length > 0 && (
		// 				<div className="container">
		// 					<RadarDataChart data={this.productDetails} style={radarStyle} width="400" height="400" margin={50} />
		// 				</div>
		// 			)}
		// 			{this.productDetails.attributes.flavors.length > 0 && (
		// 				<div className="container">
		// 					<div className="tags">
		// 						{this.productDetails.attributes.flavors.map((flavor, i) => (
		// 							<span key={i} className="tag is-info is-rounded">
		// 								{flavor}
		// 							</span>
		// 						))}
		// 					</div>
		// 				</div>
		// 			)}
		// 			<hr />
		// 			<div>
		// 				<label>Unit: </label> <br />
		// 				<select name="unit" value={unitValue} onChange={e => this.props.handleInputChange(productID)}>
		// 					{this.productDetails.availUnits.map((unit, i) => (
		// 						<option key={i} value={unit}>
		// 							{unit}
		// 						</option>
		// 					))}
		// 				</select>
		// 			</div>
		// 			<br />

		// 			<div>
		// 				<label>Quantity: </label> <br />
		// 				<input type="number" name="quantity" value={quantityValue} onChange={e => this.props.handleInputChange(productID)} />
		// 			</div>
		// 		</div>
		// 		<div className="card-footer">
		// 			<a
		// 				className={(this.props.isInCart(productID) ? "is-danger" : "is-primary") + " card-footer-item button"}
		// 				onClick={e => this.props.handleProductAdd(productID)}
		// 				//disabled={this.isDisabled(productID)}
		// 			>
		// 				{this.props.isInCart(productID) ? "Remove From Cart" : "Add to Cart"}
		// 			</a>
		// 		</div>
		// 	</div>
		// );
	}
}

export default ProductDetail;
