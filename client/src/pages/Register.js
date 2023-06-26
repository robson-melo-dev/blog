import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await res.json();
    res.status === 200
      ? alert("Registration successful!")
      : alert("Registration Failed!");
  }
  return (
    <form className="Register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
