import "./App.scss";
import Post from "./components/Post";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import Index from "./pages/Index";
import {
  UserContext,
  UserContextProvider,
} from "./components/Context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import { ProtectedRoute } from "./components/ProtectedRoute";

const user = UserContext;

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
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
