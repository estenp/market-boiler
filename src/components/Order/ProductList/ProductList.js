import React from "react";
import ProductCard from "../../ProductCard/ProductCard";

const ProductList = ({props}) => (
	<div>
		Product list
		{/* <div className={(this.state.page === 1 ? "" : "hidden") + " columns is-centered"}>
			{this.productsData.map(product => {
				return (
					<ProductCard
						key={product.productID}
						productDetails={product}
						state={this.state}
						handleClick={this.handleProductCardClick}
						handleChange={this.handleInputChange}
					/>
					<div>{product}</div>
				);
			})}
		</div> */}
	</div>
);

export default ProductList;
