import React from "react";
import ProductCard from "../../ProductCard/ProductCard";

export class ProductList extends React.Component {
	constructor(props) {
		super(props);
	}

	isInCart = productID => {
		console.log(this.props.orderState.cart.indexOf(productID) === -1 ? false : true);
		return this.props.orderState.cart.indexOf(productID) === -1 ? false : true;
	};

	render() {
		return (
			<div>
				<div className="columns is-centered">
					{this.props.products.map(product => {
						return (
							<ProductCard
								key={product.productID}
								productDetails={product}
								productState={this.props.orderState.products}
								isInCart={() => this.IsInCart(product.productID)}
								handleClick={this.props.handleProductCardClick}
								handleChange={this.props.handleInputChange}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ProductList;
