import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <form className="Login" action="">
      <h1>Login</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
};

export default Login;
