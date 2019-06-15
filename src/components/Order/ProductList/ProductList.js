import React from "react";
import ProductCard from "../../ProductCard/ProductCard";

export class ProductList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="columns is-centered is-multiline">
					{this.props.products.map(product => {
						return (
							<div key={product.id} className="column is-one-third-desktop is-full-tablet">
								<ProductCard
									key={product.id}
									productDetails={product}
									productState={this.props.orderState.products}
									isInCart={this.props.isInCart(product.id)}
									handleClick={this.props.handleProductCardClick}
									handleChange={this.props.handleInputChange}
									updateQuantity={this.props.updateQuantity}
									location={this.props.location}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ProductList;
