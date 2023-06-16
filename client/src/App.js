import "./App.scss";
import Post from "./components/Post";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import Index from "./pages/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
