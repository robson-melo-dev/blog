import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
