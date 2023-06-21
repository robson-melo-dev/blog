import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Index = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/posts").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
};

export default Index;
