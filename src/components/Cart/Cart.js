import React from "react";
import "./Cart.module.scss";

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	getProductNameByID(id) {}

	render() {
		return (
			<div styleName="cart-container">
				<div className="card" styleName="cart">
					<header className="card-header">
						<p className="card-header-title">Cart</p>
						<a href="#" className="card-header-icon" aria-label="more options">
							<span className="icon">
								<i className="fas fa-angle-down" aria-hidden="true" />
							</span>
						</a>
					</header>
					<div className="card-content">
						<ul>
							{this.props.cart.map(prod => (
								<li>{prod}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
