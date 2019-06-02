import React from "react";
import "./ProductCard.module.scss";
import RadarDataChart from "../RadarDataChart/RadarDataChart";
import {Link} from "gatsby";

export default class ProductCard extends React.Component {
	constructor(props) {
		super(props);
		//console.log(props);
		this.isDisabled.bind(this);
	}

	isDisabled(productID) {
		return this.props.productState[productID].quantity == "";
	}

	render() {
		var productID = this.props.productDetails.id;
		var unitValue = this.props.productState[productID].unit;
		var quantityValue = this.props.productState[productID].quantity;

		const radarStyle = {
			axes: {
				line: {
					strokeWidth: 0.5,
					strokeOpacity: 0.5,
					fillOpacity: 0.1,
					stroke: "#ddd",
					strokeWidth: 2,
					strokeOpacity: 0.4
				},
				ticks: {color: "blue"},
				text: {display: "none"}
			},
			labels: {
				fontSize: 14
			},
			polygons: {
				fillOpacity: 0.1,
				stroke: "rgb(41, 29, 224)",
				fill: "rgb(137, 234, 84)",
				strokeWidth: 2,
				strokeOpacity: 0.3
			}
		};

		return (
			<div key={productID} className="column">
				<div className="card" styleName={this.props.isInCart === true ? "isInCart" : ""}>
					<Link to={`/products/product-detail/${productID}`}>
						<div className="card-header">
							<div className="card-header-title">
								{this.props.productDetails.title} <br />
								<span className="is-italic has-text-weight-light has-text-light has-text-primary">{this.props.productDetails.type}</span>
							</div>
						</div>
					</Link>
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={this.props.productDetails.image} alt="Placeholder image" />
						</figure>
					</div>
					<div className="card-content">
						<div styleName="product-description">
							<p>{this.props.productDetails.description}</p>
						</div>
						<div className="columns is-centered">
							{this.props.productDetails.attributes.effects.length > 0 && (
								<RadarDataChart data={this.props.productDetails} style={radarStyle} width={200} height={200} margin={25} />
							)}
						</div>
						<hr />
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
