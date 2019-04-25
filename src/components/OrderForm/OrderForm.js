import React from "react";
import "./OrderForm.module.scss";

export default class OrderForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section>
				<form name="order" method="POST" netlify-honeypot="bot-field" data-netlify="true">
					<p className="hidden">
						<label>
							Don’t fill this out if you're human: <input name="bot-field" />
						</label>
					</p>
					<input type="hidden" name="form-name" value="order" />
					<div className="field">
						<label className="label">Name: </label>
						<div className="control">
							<input className="input" type="text" id="name" name="name" required />
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
								placeholder="joe@gmail.com"
								pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
								size="30"
								required
							/>
						</div>
						<p className="help">Must be a valid email format.</p>
					</div>
					<div className="field">
						<label className="label">Phone: </label>
						<div className="control">
							<input className="input" type="tel" id="phone" name="phone" title="10 digit phone number." />
						</div>
						<p className="help">E.g. 1234567789</p>
					</div>
					<div className="field">
						<label className="label">Message: </label>
						<div className="control">
							<textarea className="textarea" name="message" id="message" />
						</div>
					</div>
					<div data-netlify-recaptcha />
					<button type="submit" className="button">
						Submit
					</button>
				</form>
			</section>
		);
	}
}
