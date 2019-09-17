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
import {Router, Location} from "@reach/router";
import {Link} from "gatsby";
import useCatchMissingData from "../hooks/useCatchPageError.js";

export class ProductPageTemplate extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	//console.log("product page props", props);
	// 	const flavorsDict = {};
	// 	const effectsDict = {};
	// 	this.props.flavors.forEach(({node: f}) => {
	// 		flavorsDict[f.value] = f.label;
	// 	});
	// 	this.props.effects.forEach(({node: e}) => {
	// 		effectsDict[e.value] = e.label;
	// 	});
	// 	this.productsData = [];
	// 	// build all product data object
	// 	this.props.products.forEach(p => {
	// 		if (p.node.attributes.flavors.length > 0) {
	// 			p.node.attributes.flavors.forEach((f, i) => {
	// 				p.node.attributes.flavors[i] = flavorsDict[f];
	// 			});
	// 		}
	// 		if (p.node.attributes.effects.length > 0) {
	// 			p.node.attributes.effects.forEach((e, i) => {
	// 				p.node.attributes.effects[i]["label"] = effectsDict[e.effect];
	// 			});
	// 		}
	// 		this.productsData.push(p.node);
	// 		// console.log(this.productsData);
	// 	});
	// 	// // // build state for products order form
	// 	let prodState = {};
	// 	this.productsData.forEach(p => {
	// 		prodState[p.id] = {
	// 			quantity: 1,
	// 			unit: p.availUnits[0]
	// 		};
	// 	});
	// 	this.state = {
	// 		products: prodState,
	// 		cart: [],
	// 		page: 1
	// 	};
	// 	// // //
	// 	this.handleInputChange = this.handleInputChange.bind(this);
	// 	this.handleProductCardClick = this.handleProductCardClick.bind(this);
	// 	this.isInCart = this.isInCart.bind(this);
	// 	//console.log(this.state);
	// }
	// handleInputChange(productID, event) {
	// 	console.log(productID, event);
	// 	const target = event.target;
	// 	const value = target.type === "checkbox" ? target.checked : target.value;
	// 	const name = target.name;
	// 	this.setState(state => {
	// 		let cloneState = {...state.products};
	// 		cloneState[productID][name] = value;
	// 		return {
	// 			products: cloneState
	// 		};
	// 	});
	// }
	// handleCartClick = () => {
	// 	console.log(this.state.page);
	// 	if (this.state.page === 1) {
	// 		this.handlePaginate(2);
	// 	}
	// };
	// handlePaginate(page) {
	// 	this.setState({
	// 		page: page
	// 	});
	// 	window.scrollTo(0, 0);
	// }
	// handleProductCardClick(productID) {
	// 	// add click source condition and accept click events from cart?
	// 	console.log(productID);
	// 	this.setState(state => {
	// 		// add to cart
	// 		var cloneProductState = {...state.products};
	// 		if (!this.isInCart(productID)) {
	// 			var newCart = [...state.cart, productID];
	// 			if (!state.products[productID].quantity) {
	// 				cloneProductState[productID].quantity = 1;
	// 			}
	// 		}
	// 		// remove from cart
	// 		else {
	// 			var newCart = state.cart.slice();
	// 			let index = state.cart.indexOf(productID);
	// 			newCart.splice(index, 1);
	// 		}
	// 		// return updated state
	// 		return {
	// 			products: cloneProductState,
	// 			cart: newCart
	// 		};
	// 	});
	// }
	// isInCart = productID => {
	// 	return this.state.cart.indexOf(productID) === -1 ? false : true;
	// };
	// getProductInfoByID = id => {
	// 	let prodInfo;
	// 	this.productsData.forEach(p => {
	// 		if (p.id === id) {
	// 			prodInfo = p;
	// 		}
	// 	});
	// 	return prodInfo;
	// };
	// updateQuantity = (productID, newQuant) => {
	// 	this.setState(state => {
	// 		let cloneState = {...state.products};
	// 		cloneState[productID].quantity = newQuant;
	// 		return {
	// 			products: cloneState
	// 		};
	// 	});
	// };
	// render() {
	// 	const {title, content, contentComponent} = this.props;
	// 	const PageContent = contentComponent || Content;
	// 	return (
	// 		<Layout>
	// 			<section className="section section--gradient">
	// 				<Location>
	// 					{({location}) => (
	// 						<Cart
	// 							cart={this.state.cart}
	// 							products={this.productsData}
	// 							productState={this.state.products}
	// 							location={location}
	// 							currentPage={this.state.page}
	// 							handleCartClick={this.handleCartClick}
	// 							getProductInfoByID={this.getProductInfoByID}
	// 						/>
	// 					)}
	// 				</Location>
	// 				<div className="container">
	// 					<div className="columns">
	// 						<div className="column is-10 is-offset-1">
	// 							<section className="section">
	// 								<h2 className="title">{title}</h2>
	// 								<div className="content">
	// 									<PageContent className="content" content={content} />
	// 								</div>
	// 								<Location>
	// 									{({location}) => (
	// 										<div>
	// 											<nav className="breadcrumb " aria-label="breadcrumbs">
	// 												<ul>
	// 													<li>
	// 														<Link to="/products">Products</Link>
	// 													</li>
	// 													{location.pathname.indexOf("product-detail") > -1 && (
	// 														<li className="is-active">
	// 															<Link to="#">Product Detail</Link>
	// 														</li>
	// 													)}
	// 													{location.pathname.indexOf("order-form") > -1 && (
	// 														<li className="is-active">
	// 															<Link to="#">Customer Info</Link>
	// 														</li>
	// 													)}
	// 												</ul>
	// 											</nav>
	// 											<Router>
	// 												<ProductList
	// 													products={this.productsData}
	// 													orderState={this.state}
	// 													handleProductCardClick={this.handleProductCardClick}
	// 													handleInputChange={this.handleInputChange}
	// 													updateQuantity={this.updateQuantity}
	// 													isInCart={this.isInCart}
	// 													path="/products/"
	// 												/>
	// 												<ProductDetail
	// 													products={this.productsData}
	// 													orderState={this.state}
	// 													isInCart={this.isInCart}
	// 													handleProductAdd={this.handleProductCardClick}
	// 													handleInputChange={this.handleInputChange}
	// 													updateQuantity={this.updateQuantity}
	// 													getProductInfoByID={this.getProductInfoByID}
	// 													location={location}
	// 													path="/products/product-detail/:productID"
	// 												/>
	// 												<OrderForm submit={this.submitOrder} orderState={this.state} path="/products/order-form/" />
	// 											</Router>
	// 										</div>
	// 									)}
	// 								</Location>
	// 							</section>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</section>
	// 		</Layout>
	// 	);
	// }
}

// ProductPageTemplate.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	content: PropTypes.string,
// 	contentComponent: PropTypes.func
// };

const ProductPage = ({props}) => {
	const page = useCatchMissingData(props);
	// const productPageData = props.productPage;
	// const {edges: products} = props.products;
	// const {edges: flavors} = props.flavors;
	// const {edges: effects} = props.effects;
	return (
		<ProductPageTemplate
			title={page.title}
			content={page._rawBody}
			// products={products}
			// flavors={flavors}
			// effects={effects}
		/>
	);
};

// ProductPage.propTypes = {
// 	data: PropTypes.object.isRequired
// };

export default ProductPage;

// export const ProductPageQuery = graphql`
// 	query ProductPage($id: String!) {
// 		productPage: markdownRemark(id: {eq: $id}) {
// 			html
// 			frontmatter {
// 				title
// 			}
// 		}

// 		products: allProductsJson {
// 			edges {
// 				node {
// 					id
// 					title
// 					type
// 					image
// 					description
// 					pricePerUnit
// 					availUnits
// 					attributes {
// 						strain
// 						effects {
// 							effect
// 							level
// 						}
// 						flavors
// 					}
// 				}
// 			}
// 		}

// 		flavors: allFlavorsJson {
// 			edges {
// 				node {
// 					id
// 					label
// 					value
// 				}
// 			}
// 		}

// 		effects: allEffectsJson {
// 			edges {
// 				node {
// 					id
// 					label
// 					value
// 				}
// 			}
// 		}
// 	}
// `;
