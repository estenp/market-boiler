import React from "react";
import "./Cart.module.scss";

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card" styleName="cart">
				<header className="card-header">
					<p className="card-header-title">Cart</p>
				</header>
			</div>
		);
	}
}
