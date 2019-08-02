import React from "react";
import "./OrderForm.module.scss";

export default class OrderForm extends React.Component {
	constructor(props) {
		super(props);
		//console.log(props, typeof props.orderState.products);

		let cart = JSON.stringify(
			props.orderState.cart.map(p => {
				return {
					[p]: {
						quantity: props.orderState.products[p].quantity,
						unit: props.orderState.products[p].unit
					}
				};
			})
		);

		// let productEntries = Object.entries(props.orderState.products);
		// let cartInfo = productEntries.filter(id => {
		// 	return props.orderState.cart.indexOf(id[0]) > -1;
		// });

		// cartInfo.reduce((filteredObj, i) => {
		// 	return {
		// 		i[0]
		// 	}
		// }, {});
		console.log(cart);
	}
	componentDidUpdate() {
		if (this.props.location.state.submitMe === true) {
			this.refs.orderForm.submit();
		}
	}

	render() {
		return (
			<section>
				<form ref="orderForm" name="order" method="POST" netlify-honeypot="bot-field" data-netlify="true">
					<p className="hidden">
						<label>
							Don’t fill this out if you're human: <input name="bot-field" />
						</label>
					</p>
					<input type="hidden" name="form-name" value="order" />
					<div className="field">
						<label className="label">First Name: </label>
						<div className="control">
							<input className="input" type="text" id="firstName" name="firstName" required />
						</div>
					</div>
					<div className="field">
						<label className="label">Last Name: </label>
						<div className="control">
							<input className="input" type="text" id="lastName" name="lastName" required />
						</div>
					</div>
					<div className="field">
						<label className="label">Email: </label>
						<div className="control">
							<input
								className="input"
								type="email"
								id="email"
								name="email"
								title="Must be a valid email format."
								pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
								size="30"
								placeholder="joe@gmail.com"
								required
							/>
						</div>
						<p className="help">Must be a valid email format</p>
					</div>
					<div className="field">
						<label className="label">Phone: </label>
						<div className="control">
							<input className="input" type="tel" id="phone" name="phone" title="10 digit phone number." placeholder="3124456745" />
						</div>
						<p className="help">Without additional characters</p>
					</div>
					<div className="field">
						<label className="label">Comments: </label>
						<div className="control">
							<textarea className="textarea" name="comments" id="comments" />
						</div>
					</div>
					{this.props.orderState.cart.map(id => (
						<div key={"product" + id}>
							<input name={"productID" + id} type="hidden" value={id} />
							<input name={"quantity" + id} type="hidden" value={this.props.orderState.products[id].quantity} />
							<input name={"units" + id} type="hidden" value={this.props.orderState.products[id].unit} />
						</div>
					))}
					{/* <input type="hidden" name="cart" value={this.cart} /> */}
					<div data-netlify-recaptcha />
					<button type="submit" className="button">
						Submit
					</button>
				</form>
			</section>
		);
	}
}
