import React from "react";
import "./ProductCard.module.scss";
import RadarDataChart from "../RadarDataChart/RadarDataChart";
import NumberInput from "../NumberInput/NumberInput";
import {Link} from "gatsby";
//import Img from "gatsby-image";

export default class ProductCard extends React.Component {
	constructor(props) {
		super(props);
		// console.log("product card props", props);

		// TODO - better way to handle this. Also Radar chart
		if (props.location.pathname.indexOf("product-detail") > -1) {
			this.detailPage = true;
		}

		this.isDisabled.bind(this);
		//console.log(props.productDetails.flavors);
	}

	isDisabled(productID) {
		return this.props.productState[productID].quantity === "";
	}

	render() {
		let productID = this.props.productDetails._id;
		let unitValue = this.props.productState[productID].unit;
		let quantityValue = this.props.productState[productID].quantity;

		return (
			<div key={productID} className="column">
				<div className="card" styleName={this.props.isInCart === true ? "isInCart" : ""}>
					<Link to={`/products/product-detail/${productID}`}>
						<div className="card-header" styleName="card-header">
							<div className="card-header-title">{this.props.productDetails.name}</div>
							<br />
							{/* <span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.props.productDetails.type}</span> */}
							<div className="tags has-addons" styleName="tags">
								<span className="tag">{this.props.productDetails.type.label}</span>
								{this.props.productDetails.strain && <span className="tag is-primary">{this.props.productDetails.strain.label}</span>}
							</div>
						</div>
					</Link>
					<div className="card-content">
						{/* <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
							<line x1="0" y1="7" x2="30" y2="7" stroke="black" stroke-dasharray="4 4 1 1" stroke-dashoffset="4" />
						</svg> */}
						<div className="columns is-multiline" styleName="product-attributes-container">
							<figure className="column image">
								<img
									className={!this.detailPage ? "is-rounded" : ""}
									styleName="product-image"
									src={this.props.productDetails._rawImage}
									alt="Placeholder"
								/>
							</figure>
							<div className="column">
								{this.props.productDetails.flavors.length > 0 && (
									<div styleName="flavor-section">
										{/* <h6 className="subtitle is-6 has-text-primary" styleName="attribute-section-subheader">
									Flavors
								</h6> */}
										<div>
											<div className="tags">
												{this.props.productDetails.flavors.map((flavor, i) => (
													<span key={i} className="tag is-info is-rounded">
														{flavor.label}
													</span>
												))}
											</div>
										</div>
									</div>
								)}
								{this.props.productDetails.effects.length > 0 && (
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
							<label>Quantity: </label> <br />
							{/* <input type="number" name="quantity" value={quantityValue} onChange={this.props.handleChange.bind(this, productID)} /> */}
						</div>
						<div className="columns">
							<div className="column" styleName={this.detailPage ? "quantity-input" : "quantity-input-full"}>
								<NumberInput quantity={quantityValue} productID={productID} handleChangeFromClick={this.props.updateQuantity} />
							</div>
						</div>
						<br />
						<div>
							<label>Unit: </label> <br />
							<div className="select" styleName={!this.detailPage ? "unit-select-full" : ""}>
								<select name="unit" value={unitValue} onChange={this.props.handleChange.bind(this, productID)}>
									{this.props.productDetails.options.map((option, i) => (
										<option key={i} value={option.unitType}>
											{option.unitType}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className="card-footer">
						<button
							className={(this.props.isInCart === true ? "is-danger" : "is-primary") + " card-footer-item button"}
							onClick={this.props.handleClick.bind(this, productID)}
							//disabled={this.isDisabled(productID)}
						>
							{this.props.isInCart === true ? "Remove From Cart" : "Add to Cart"}
						</button>
					</div>
				</div>
			</div>
		);
	}
}
