import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import RadarDataChart from "../components/RadarDataChart/RadarDataChart";
import ProductCard from "../components/ProductCard/ProductCard";
import Cart from "../components/Cart/Cart";
import OrderPageTemplate from "./order-page";

export class ProductPageTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.locationData.state;
		this.setState({
			page: 3
		});
		console.log(this.state);
	}

	handleCartClick = () => {
		// go to order page and pass back new state
		// if (this.state.page === 1) {
		// 	this.handlePaginate(2);
		// }
		// this.setState({
		// 	page: 1
		// });
	};

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

	isInCart(productID) {
		return this.state.cart.indexOf(productID) === -1 ? false : true;
	}

	render() {
		const {title, content, contentComponent} = this.props;
		const PageContent = contentComponent || Content;
		const {productDetails} = this.props.locationData;
		var productID = productDetails.id;
		var unitValue = this.state.products[productID].unit;
		var quantityValue = this.state.products[productID].quantity;

		// console.log(state, productDetails);

		// 1. should click handler be contained in Cart and emit changes in state up to parent?
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

									<div className="columns is-centered">
										{/* {JSON.stringify(productDetails)} */}
										<div className="card">
											<div className="card-header">
												<div className="card-header-title">
													{productDetails.title} <br />
													<span className="is-italic has-text-weight-light has-text-light has-text-primary">
														{productDetails.type}
													</span>
												</div>
											</div>
											<div className="card-image">
												<figure className="image is-4by3">
													<img src={productDetails.image} alt="Placeholder image" />
												</figure>
											</div>
											<div className="card-content">
												<div>
													<p>{productDetails.description}</p>
												</div>
												{productDetails.attributes.effects.length > 0 && <RadarDataChart data={productDetails} />}
												<hr />
												<div>
													<label>Unit: </label> <br />
													<select name="unit" value={unitValue} onChange={this.handleInputChange.bind(this, productID)}>
														{productDetails.availUnits.map((unit, i) => (
															<option key={i} value={unit}>
																{unit}
															</option>
														))}
													</select>
												</div>
												<br />

												<div>
													<label>Quantity: </label> <br />
													<input
														type="number"
														name="quantity"
														value={quantityValue}
														onChange={this.handleInputChange.bind(this, productID)}
													/>
												</div>
											</div>
											<div className="card-footer">
												<a
													className={(this.isInCart(productID) ? "is-danger" : "is-primary") + " card-footer-item button"}
													onClick={this.handleClick.bind(this, productID)}
													//disabled={this.isDisabled(productID)}
												>
													{this.isInCart(productID) ? "Remove From Cart" : "Add to Cart"}
												</a>
											</div>
										</div>
									</div>
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

ProductPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func,
	locationData: PropTypes.object
};

const ProductPage = ({data, location}) => {
	let locationData = JSON.parse(location.state.locationData);
	const productPageData = data.productPage;
	return (
		<ProductPageTemplate
			contentComponent={HTMLContent}
			title={productPageData.frontmatter.title}
			content={productPageData.html}
			locationData={locationData}
		/>
	);
};

export default ProductPage;

export const productPageQuery = graphql`
	query productPage($id: String!) {
		productPage: markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				title
			}
		}
	}
`;
