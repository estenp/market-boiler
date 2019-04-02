import React from "react";
import {Link} from "gatsby";
import "./Navbar.module.scss";

const Navbar = ({data}) => (
	<nav styleName="navbar" className="navbar is-transparent">
		<div className="container">
			<div className="navbar-brand">
				<Link to="/" styleName="navbar-item" className="navbar-item">
					<div className="logo">
						<h1>The Dispense Report</h1>
					</div>
				</Link>
			</div>
			<div styleName="navbar-end" className="navbar-end">
				<Link styleName="navbar-item" className="navbar-item" to="/order">
					Order
				</Link>
				<Link styleName="navbar-item" className="navbar-item" to="/vendors">
					Vendors
				</Link>
				<Link styleName="navbar-item" className="navbar-item" to="/services">
					Services
				</Link>
				<Link styleName="navbar-item" className="navbar-item" to="/examples">
					Examples
				</Link>
				<Link styleName="navbar-item" className="navbar-item" to="/contact">
					Contact Us
				</Link>
			</div>
		</div>
	</nav>
);

export default Navbar;
