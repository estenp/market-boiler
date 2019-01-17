import React from "react";
import { Link } from "gatsby";
import styles from "./Navbar.module.sass";

const Navbar = ({ data }) => (
    <nav className="navbar is-transparent">
        <div className="container">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <div className="logo">
                        <img src="img/cfilogobluelight.svg" />
                    </div>
                </Link>
            </div>
            <div className="navbar-end">

                <Link className="navbar-item" to="/vendors">
                    Vendors
                </Link>
                <Link className="navbar-item" to="/services">
                    Services
                </Link>
                <Link className="navbar-item" to="/examples">
                    Examples
                </Link>
                <Link className="navbar-item" to="/contact">
                    Contact Us
                </Link>
            </div>
        </div>
    </nav>
);

export default Navbar;
