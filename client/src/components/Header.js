import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
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
    setRedirect(true);
  }

  const username = userInfo?.username;

  if (redirect) {
    return window.location.replace("/");
  }
  return (
    <header className="Header">
      <Link to="/" className="Header__Logo">
        Robson's Blog
      </Link>
      <nav className="Nav">
        {username && ( //only executes if there is an username
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
        {!username && ( //executes if there is no username
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
