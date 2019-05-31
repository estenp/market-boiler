import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import Cart from "../components/Cart/Cart";
import OrderForm from "../components/Order/OrderForm/OrderForm";
import ProductDetail from "../components/Order/ProductDetail/ProductDetail";
import ProductList from "../components/Order/ProductList/ProductList";
import {Router} from "@reach/router";

export class ProductPageTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.productsData = [];

		// build all product data object
		this.props.products.forEach(p => {
			this.productsData.push(p.node.product);
		});

		// // // build state for products order form
		let prodState = {};
		this.productsData.forEach(p => {
			prodState[p.id] = {
				quantity: 1,
				unit: p.availUnits[0]
			};
		});

		this.state = {
			products: prodState,
			cart: [],
			page: 1
		};

		// // //

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleProductCardClick = this.handleProductCardClick.bind(this);
		this.isInCart = this.isInCart.bind(this);
		//console.log(this.state);
	}

	handleInputChange(productID, event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState(state => {
			let cloneState = {...state.products};
			cloneState[productID][name] = value;
			return {
				products: cloneState
			};
		});
	}

	handleCartClick = () => {
		if (this.state.page === 1) {
			this.handlePaginate(2);
		}
	};

	handlePaginate(page) {
		this.setState({
			page: page
		});
		window.scrollTo(0, 0);
	}

	handleProductCardClick(productID) {
		// add click source condition and accept click events from cart?

		this.setState(state => {
			// add to cart
			var cloneProductState = {...state.products};
			if (!this.isInCart(productID)) {
				var newCart = [...state.cart, productID];
				if (!state.products[productID].quantity) {
					cloneProductState[productID].quantity = 1;
				}
			}
			// remove from cart
			else {
				var newCart = state.cart.slice();
				let index = state.cart.indexOf(productID);
				newCart.splice(index, 1);
			}

			// return updated state
			return {
				products: cloneProductState,
				cart: newCart
			};
		});
	}

	isInCart(productID) {
		return this.state.cart.indexOf(productID) === -1 ? false : true;
	}

	getProductInfoByID = id => {
		let prodInfo;
		this.productsData.forEach(p => {
			if (p.id === id) {
				prodInfo = p;
			}
		});
		return prodInfo;
	};

	render() {
		const {title, content, contentComponent} = this.props;
		const PageContent = contentComponent || Content;

		return (
			<Layout>
				<section className="section section--gradient">
					<Cart
						cart={this.state.cart}
						products={this.productsData}
						productState={this.state.products}
						currentPage={this.state.page}
						handleCartClick={this.handleCartClick}
						getProductInfoByID={this.getProductInfoByID}
					/>
					<div className="container">
						<div className="columns">
							<div className="column is-10 is-offset-1">
								<section className="section">
									<h2 className="title">{title}</h2>
									<div>
										<PageContent className="content" content={content} />
									</div>
									<Router>
										<ProductList
											products={this.productsData}
											orderState={this.state}
											handleProductCardClick={this.handleProductCardClick}
											handleInputChange={this.handleInputChange}
											path="/products/"
										/>
										<ProductDetail
											products={this.productsData}
											getProductInfoByID={this.getProductInfoByID}
											path="/products/product-detail/:productID"
										/>
										<OrderForm cart={this.state.cart} path="/products/order-form/" />
									</Router>
								</section>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}

ProductPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const ProductPage = ({data}) => {
	const productPageData = data.productPage;
	const {edges: products} = data.products;
	return <ProductPageTemplate contentComponent={HTMLContent} title={productPageData.frontmatter.title} content={productPageData.html} products={products} />;
};

ProductPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default ProductPage;

export const ProductPageQuery = graphql`
	query ProductPage($id: String!) {
		productPage: markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				title
			}
		}

		products: allFile(filter: {sourceInstanceName: {eq: "products"}}) {
			edges {
				node {
					extension
					dir
					modifiedTime
					name
					product: childProductsJson {
						id
						title
						type
						image
						description
						pricePerUnit
						availUnits
						attributes {
							strain
							effects {
								effect
								level
							}
							flavors
						}
					}
				}
			}
		}
	}
`;
