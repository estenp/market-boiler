import React from "react";
import { Link } from "gatsby";
import "./Navbar.scss";

const Navbar = ({ data }) => (
	<nav styleName="navbar" className="navbar is-transparent">
		<div className="container">
			<div className="navbar-brand">
				<Link to="/" styleName="navbar-item" className="navbar-item">
					<div className="logo">
						<img src="../img/cfilogobluelight.svg" />
					</div>
				</Link>
			</div>
			<div className="navbar-end">
				<Link
					styleName="navbar-item"
					className="navbar-item"
					to="/vendors"
				>
					Vendors
				</Link>
				<Link
					styleName="navbar-item"
					className="navbar-item"
					to="/services"
				>
					Services
				</Link>
				<Link
					styleName="navbar-item"
					className="navbar-item"
					to="/examples"
				>
					Examples
				</Link>
				<Link
					styleName="navbar-item"
					className="navbar-item"
					to="/contact"
				>
					Contact Us
				</Link>
			</div>
		</div>
	</nav>
);

export default Navbar;
