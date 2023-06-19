import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { UserContext } from "./Context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header className="Header">
      <Link to="/" className="Header__Logo">
        Robson's Blog
      </Link>
      <nav className="Nav">
        {username && (
          <>
            <p className="Nav__Welcome">
              Welcome, <span className="Nav__User">{username}</span>
            </p>
            <Link to="/create" className="Nav__Link">
              Create new Post
            </Link>
            <a onClick={logout} className="Nav__Link">
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="Nav__Link">
              Login
            </Link>
            <Link to="/register" className="Nav__Link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
