import React from "react";
import { Link } from "gatsby";
import styles from "./Navbar.module.sass";

const Navbar = ({ data }) => (
    <nav className="{styles.navbar styles.is-transparent}">
        <div className="{styles.container}">
            <div className="{styles.navbar-brand}">
                <Link to="/" className="{styles.navbar-item}">
                    <div className="{styles.logo}">
                        <img src="img/cfilogobluelight.svg" />
                    </div>
                </Link>
            </div>
            <div className="{styles.navbar-end}">

                <Link className="{styles.navbar-item}" to="/vendors">
                    Vendors
                </Link>
                <Link className="{styles.navbar-item}" to="/services">
                    Services
                </Link>
                <Link className="{styles.navbar-item}" to="/examples">
                    Examples
                </Link>
                <Link className="{styles.navbar-item}" to="/contact">
                    Contact Us
                </Link>
            </div>
        </div>
    </nav>
);

export default Navbar;
