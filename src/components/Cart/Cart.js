import React, {useState, useEffect} from "react";
import {navigate} from "@reach/router";
import "./Cart.module.scss";

const Cart = props => {
	const [cartIsExpanded, setCartIsExpanded] = useState(true);

	const [cartButtonState, setCartButtonState] = useState({
		text: "Continue",
		buttonClass: "fa-arrow-right",
		navigateTo: "/products/order-form/"
	});

	useEffect(() => {
		if (props.location.pathname.indexOf("product-detail") > -1) {
			setCartButtonState({
				text: "Back to Products",
				buttonClass: "fa-arrow-left",
				navigateTo: "/products/"
			});
		} else if (props.location.pathname.indexOf("order-form") > -1) {
			setCartButtonState({
				text: "Submit Order",
				buttonClass: ""
			});
		} else {
			setCartButtonState({
				text: "Continue",
				buttonClass: "fa-arrow-right",
				navigateTo: "/products/order-form/"
			});
		}
	});

	const toggleCart = () => {
		if (props.cart.length > 0) {
			setCartIsExpanded(!cartIsExpanded);
		}
	};

	const handleButtonClick = () => {
		navigate(cartButtonState.navigateTo);
	};

	return (
		<div styleName="cart-container">
			<div className="card" styleName="cart">
				<header className="card-header">
					<a href="javascript:void(0)" className="card-header-icon has-text-secondary" aria-label="shopping-cart-icon">
						<i className="fas fa-shopping-cart" styleName="cart-icon" />
					</a>
					<p className="card-header-title">
						<span>{props.cart.length}</span>
					</p>

					<a href="javascript:void(0)" className="card-header-icon" aria-label="expand-cart-items" onClick={toggleCart}>
						<span className="icon">
							<i className={cartIsExpanded ? "fas fa-angle-up" : "fas fa-angle-down"} aria-hidden="true" />
						</span>
					</a>
				</header>
				{props.cart.length > 0 && cartIsExpanded && (
					<span>
						<div className="card-content">
							<ul>
								{props.cart.map(prodID => {
									return (
										<li key={prodID}>
											<span className="is-size-6">{props.getProductInfoByID(prodID).title}</span>
											<br />
											<span className="is-size-7">
												{props.productState[prodID].quantity} {props.productState[prodID].unit}
											</span>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="card-footer">
							<button className="is-info card-footer-item button" onClick={handleButtonClick}>
								<i className={"fas " + cartButtonState.buttonClass} />
								&nbsp;&nbsp;
								{cartButtonState.text}
							</button>
						</div>
					</span>
				)}
			</div>
		</div>
	);
};

export default Cart;
