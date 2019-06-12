import React from "react";
import "./ProductCard.module.scss";
import RadarDataChart from "../RadarDataChart/RadarDataChart";
import NumberInput from "../NumberInput/NumberInput";
import {Link} from "gatsby";
//import Img from "gatsby-image";

export default class ProductCard extends React.Component {
	constructor(props) {
		super(props);

		if (props.location.pathname.indexOf("product-detail") > -1) {
			this.detailPage = true;
		}

		this.isDisabled.bind(this);
	}

	isDisabled(productID) {
		return this.props.productState[productID].quantity == "";
	}

	render() {
		let productID = this.props.productDetails.id;
		let unitValue = this.props.productState[productID].unit;
		let quantityValue = this.props.productState[productID].quantity;

		return (
			<div key={productID} className="column">
				<div className="card" styleName={this.props.isInCart === true ? "isInCart" : ""}>
					<Link to={`/products/product-detail/${productID}`}>
						<div className="card-header" styleName="card-header">
							<div className="card-header-title">{this.props.productDetails.title}</div>
							<br />
							{/* <span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.props.productDetails.type}</span> */}
							<div className="tags has-addons" styleName="tags">
								<span className="tag">{this.props.productDetails.type}</span>
								{this.props.productDetails.attributes.strain && (
									<span className="tag is-primary">{this.props.productDetails.attributes.strain}</span>
								)}
							</div>
						</div>
					</Link>
					<div className="card-content">
						{/* <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
							<line x1="0" y1="7" x2="30" y2="7" stroke="black" stroke-dasharray="4 4 1 1" stroke-dashoffset="4" />
						</svg> */}
						<div className="columns is-multiline">
							<figure className="column image">
								<img
									className={!this.detailPage ? "is-rounded" : ""}
									styleName="product-image"
									src={this.props.productDetails.image}
									alt="Placeholder image"
								/>
							</figure>
							<div className="column">
								{this.props.productDetails.attributes.flavors.length > 0 && (
									<div styleName="flavor-section">
										{/* <h6 className="subtitle is-6 has-text-primary" styleName="attribute-section-subheader">
									Flavors
								</h6> */}
										<div>
											<div className="tags">
												{this.props.productDetails.attributes.flavors.map((flavor, i) => (
													<span key={i} className="tag is-info is-rounded">
														{flavor}
													</span>
												))}
											</div>
										</div>
									</div>
								)}
								{this.props.productDetails.attributes.effects.length > 0 && (
									<div styleName="effect-chart">
										{/* <h6 className="subtitle is-6 has-text-primary" styleName="attribute-section-subheader">
											Effects
										</h6> */}

										<div className="columns is-centered">
											<RadarDataChart data={this.props.productDetails} detailPage={this.detailPage} />
										</div>
									</div>
								)}
							</div>
						</div>

						<div styleName="product-description">
							<p>{this.props.productDetails.description}</p>
						</div>
						<div>
							<label>Unit: </label> <br />
							<select name="unit" value={unitValue} onChange={this.props.handleChange.bind(this, productID)}>
								{this.props.productDetails.availUnits.map((unit, i) => (
									<option key={i} value={unit}>
										{unit}
									</option>
								))}
							</select>
						</div>
						<br />

						<div>
							<label>Quantity: </label> <br />
							<NumberInput />
							<input type="number" name="quantity" value={quantityValue} onChange={this.props.handleChange.bind(this, productID)} />
						</div>
					</div>
					<div className="card-footer">
						<a
							className={(this.props.isInCart === true ? "is-danger" : "is-primary") + " card-footer-item button"}
							onClick={this.props.handleClick.bind(this, productID)}
							//disabled={this.isDisabled(productID)}
						>
							{this.props.isInCart === true ? "Remove From Cart" : "Add to Cart"}
						</a>
					</div>
				</div>
			</div>
		);
	}
}
