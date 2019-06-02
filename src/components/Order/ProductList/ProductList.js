import React from "react";
import ProductCard from "../../ProductCard/ProductCard";

export class ProductList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="columns is-centered">
					{this.props.products.map(product => {
						return (
							<ProductCard
								key={product.id}
								productDetails={product}
								productState={this.props.orderState.products}
								isInCart={this.props.isInCart(product.id)}
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
