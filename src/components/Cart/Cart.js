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

	getProductNameByID = id => {
		let name;
		this.props.products.forEach(p => {
			if (p.id === id) {
				name = p.title;
			}
		});
		return {__html: name};
	};

	render() {
		return (
			<div styleName="cart-container">
				<div className="card" styleName="cart">
					<header className="card-header">
						<a href="javascript:void(0)" className="card-header-icon has-text-primary" aria-label="shopping-cart-icon">
							<i className="fas fa-shopping-cart" styleName="cart-icon" />
						</a>
						<p className="card-header-title">
							<span>{this.props.cart.length}</span>
						</p>

						<a href="javascript:void(0)" className="card-header-icon" aria-label="expand-cart-items" onClick={this.toggleCart}>
							<span className="icon">
								<i className={this.state.cartIsExpanded ? "fas fa-angle-up" : "fas fa-angle-down"} aria-hidden="true" />
							</span>
						</a>
					</header>
					{this.props.cart.length > 0 && this.state.cartIsExpanded && (
						<div className="card-content">
							<ul>
								{this.props.cart.map(prodID => (
									<li key={prodID}>
										<span dangerouslySetInnerHTML={this.getProductNameByID(prodID)} />
										<br />
										{/* <span>{}</span> */}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		);
	}
}
