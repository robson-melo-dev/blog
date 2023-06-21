import "./App.scss";
import Post from "./components/Post";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import Index from "./pages/Index";
import { UserContextProvider } from "./components/Context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
