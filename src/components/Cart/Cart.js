import React from "react";
import "./Cart.module.scss";

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			cartIsExpanded: true
		};

		this.toggleCart = this.toggleCart.bind(this);
	}

	toggleCart() {
		if (this.props.cart.length > 0) {
			this.setState({
				cartIsExpanded: !this.state.cartIsExpanded
			});
		}
	}

	getProductNameByID(id) {}

	render() {
		return (
			<div styleName="cart-container">
				<div className="card" styleName="cart">
					<header className="card-header">
						<a href="javascript:void(0)" className="card-header-icon has-text-primary" aria-label="shopping-cart-icon">
							<i className="fas fa-shopping-cart" />
						</a>
						<p className="card-header-title">
							Cart &nbsp;<span>{this.props.cart.length}</span>
						</p>

						<a href="javascript:void(0)" className="card-header-icon" aria-label="expand-cart-items" onClick={this.toggleCart}>
							<span className="icon">
								<i className={this.state.cartIsExpanded ? "fas fa-angle-up" : "fas fa-angle-down"} aria-hidden="true" />
							</span>
						</a>
					</header>
					{this.props.cart.length < 1 && (
						<div className="card-content">
							<p>Your cart is empty.</p>
						</div>
					)}
					{this.props.cart.length > 0 && this.state.cartIsExpanded && (
						<div className="card-content">
							<ul>
								{this.props.cart.map(prod => (
									<li key={prod}>{prod}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		);
	}
}
