import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import Cart from "../components/Cart/Cart";
import OrderForm from "../components/OrderForm/OrderForm";

export class OrderPageTemplate extends React.Component {
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
		//this.isInCart = this.isInCart.bind(this);
		//console.log(this.state);
	}

	handleInputChange(productID, event) {
		console.log("ls");
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
					/>
					<div className="container">
						<div className="columns">
							<div className="column is-10 is-offset-1">
								<section className="section">
									<h2 className="title">{title}</h2>

									<div className={(this.state.page === 1 ? "" : "hidden") + " columns is-centered"}>
										{this.productsData.map(product => {
											return (
												<ProductCard
													key={product.productID}
													productDetails={product}
													state={this.state}
													handleClick={this.handleProductCardClick}
													handleChange={this.handleInputChange}
												/>
											);
										})}
									</div>
									<section className={this.state.page === 2 ? "animateIn" : "hidden"}>
										<OrderForm />
									</section>
									<div>
										<PageContent className="content" content={content} />
									</div>
								</section>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}

OrderPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const OrderPage = ({data}) => {
	const orderPageData = data.orderPage;
	const {edges: products} = data.products;
	return <OrderPageTemplate contentComponent={HTMLContent} title={orderPageData.frontmatter.title} content={orderPageData.html} products={products} />;
};

OrderPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default OrderPage;

export const OrderPageQuery = graphql`
	query OrderPage($id: String!) {
		orderPage: markdownRemark(id: {eq: $id}) {
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
