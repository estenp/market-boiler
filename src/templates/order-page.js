import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import Cart from "../components/Cart/Cart";

export class OrderPageTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.products = [];

		this.props.products.forEach(p => {
			this.products.push(p.node.product);
		});

		let prodState = {};
		this.products.forEach(p => {
			prodState[p.id] = {
				quantity: "",
				unit: p.availUnits[0]
			};
		});

		this.state = {
			products: prodState,
			cart: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		//this.isInCart = this.isInCart.bind(this);
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

	handleClick(productID) {
		this.setState(state => {
			if (!this.isInCart(productID)) {
				var newCart = [...state.cart, productID];
			} else {
				var newCart = state.cart.slice();
				var index = state.cart.indexOf(productID);
				newCart.splice(index, 1);
			}
			return {
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
					<Cart cart={this.state.cart} products={this.products} />
					<div className="container">
						<div className="columns">
							<div className="column is-10 is-offset-1">
								<section className="section">
									<h2 className="title">{title}</h2>
									<div className="columns is-centered">
										{this.products.map(product => {
											let productID = product.id;
											//console.log(product);
											return (
												<ProductCard
													key={productID}
													productID={productID}
													productData={product}
													productState={this.state.products}
													cart={this.state.cart}
													handleClick={this.handleClick}
													handleChange={this.handleInputChange}
												/>
											);
										})}
									</div>

									<div>
										<PageContent className="content" content={content} />
									</div>
								</section>
								<section>
									<form name="order" method="POST" netlify-honeypot="bot-field" data-netlify="true">
										<p className="hidden">
											<label>
												Don’t fill this out if you're human: <input name="bot-field" />
											</label>
										</p>
										<input type="hidden" name="form-name" value="order" />
										<div className="field">
											<label className="label">Name: </label>
											<div className="control">
												<input className="input" type="text" id="name" name="name" required />
											</div>
										</div>
										<div className="field">
											<label className="label">Email: </label>
											<div className="control">
												<input
													className="input"
													type="email"
													id="email"
													name="email"
													title="Must be a valid email format."
													placeholder="joe@gmail.com"
													pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
													size="30"
													required
												/>
											</div>
											<p className="help">Must be a valid email format.</p>
										</div>
										<div className="field">
											<label className="label">Phone: </label>
											<div className="control">
												<input className="input" type="tel" id="phone" name="phone" title="10 digit phone number." />
											</div>
											<p className="help">E.g. 1234567789</p>
										</div>
										<div className="field">
											<label className="label">Message: </label>
											<div className="control">
												<textarea className="textarea" name="message" id="message" />
											</div>
										</div>
										<div data-netlify-recaptcha />
										<button type="submit" className="button">
											Submit
										</button>
									</form>
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

		products: allFile(filter: {sourceInstanceName: {eq: "data"}}) {
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
					}
				}
			}
		}
	}
`;
