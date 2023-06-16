import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/" className="Header__Logo">
        Robson's Blog
      </Link>
      <nav className="Nav">
        <Link to="/login" className="Nav__Link">
          Login
        </Link>
        <Link to="/register" className="Nav__Link">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
