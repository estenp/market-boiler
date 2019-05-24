import React from "react";
import PropTypes from "prop-types";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import Cart from "../components/Cart/Cart";

export class ProductPageTemplate extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		const {title, content, contentComponent} = this.props;
		const PageContent = contentComponent || Content;
		const {locationState, productDetails} = this.props.locationData;
		// console.log(state, productDetails);

		// 1. should click handler be contained in Cart and emit changes in state up to parent?
		return (
			<Layout>
				<section className="section section--gradient">
					{/* <Cart
						cart={locationState.cart}
						products={this.productsData}
						productState={locationState.products}
						currentPage={locationState.page}
						handleCartClick={this.handleCartClick}
					/> */}
					<div className="container">
						<div className="columns">
							<div className="column is-10 is-offset-1">
								<section className="section">
									<h2 className="title">{title}</h2>

									<div className="columns is-centered">
										{JSON.stringify(productDetails)}
										{/* {productData.map(product => {
											let productID = product.id;
											return (
												<ProductCard
													key={productID}
													productID={productID}
													productData={product}
													productState={this.state.products}
													cart={cart}
													handleClick={this.handleProductCardClick}
													handleChange={this.handleInputChange}
												/>
											);
										})} */}
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
	contentComponent: PropTypes.func
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
