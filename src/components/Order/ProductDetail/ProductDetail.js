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
				key={this.productDetails._id}
				productDetails={this.productDetails}
				productState={this.props.orderState.products}
				isInCart={this.props.isInCart(this.productDetails._id)}
				handleClick={this.props.handleProductAdd}
				handleChange={this.props.handleInputChange}
				updateQuantity={this.props.updateQuantity}
				location={this.props.location}
			/>
		);
	}
}

export default ProductDetail;
