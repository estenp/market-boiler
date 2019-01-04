import React from "react";
import { Link } from "gatsby";

import github from "../img/github-icon.svg";
import logo from "../img/logo.svg";

const Navbar = ({ data }) => (
    <nav className="navbar is-transparent">
        <div className="container">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    {/* <figure className="image">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </figure> */}
                    <div className="logo">
                        <img src="img/cfilogobluelight.svg" />
                    </div>
                </Link>
            </div>
            <div className="navbar-end">
                {/* <Link className="navbar-item" to="/about">
          About
        </Link> */}
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
            {/* <div className="navbar-end">
        <a
          className="navbar-item"
          href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={github} alt="Github" />
          </span>
        </a>
      </div> */}
        </div>
    </nav>
);

export default Navbar;
