import React from "react";
import "./Cart.module.scss";

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
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

	getProductInfoByID = id => {
		let prodInfo;
		this.props.products.forEach(p => {
			if (p.id === id) {
				prodInfo = p;
			}
		});
		return prodInfo;
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
						<span>
							<div className="card-content">
								<ul>
									{this.props.cart.map(prodID => {
										let prodInfo = this.getProductInfoByID(prodID);
										//console.log(prodInfo);
										return (
											<li key={prodID}>
												<span className="is-size-6">{prodInfo.title}</span>
												<br />
												<span className="is-size-7">
													{this.props.productState[prodID].quantity} {this.props.productState[prodID].unit}
												</span>
											</li>
										);
									})}
								</ul>
							</div>
							<div className="card-footer">
								<a className="is-info card-footer-item button" onClick={this.props.handleCartClick}>
									{this.props.currentPage === 1 ? "Continue" : "Finish"} &nbsp;&nbsp; <i className="fas fa-arrow-right" />
								</a>
							</div>
						</span>
					)}
				</div>
			</div>
		);
	}
}
