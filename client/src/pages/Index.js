import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import "./index.scss";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
    <div className="IndexPage">
      <div className="IndexPage__Hero">
        {posts.length > 0 && (
          // <Post className="IndexPage__MainPost" {...posts[0]} />
          <div className="MainPost">
            <Link to={`/post/${posts[0]._id}`}>
              <img
                className="MainPost__Image"
                src={"http://localhost:4000/" + posts[0].cover}
                alt="Post image"
              />
            </Link>
            <div className="MainPost__Summary">
              <Link to={`/post/${posts[0]._id}`}>
                <h2 className="MainPost__Title">{posts[0].title}</h2>
              </Link>
              <p className="MainPost__Info">
                <a href="#" className="MainPost__Author">
                  {posts[0].author.username}
                </a>
                <time className="MainPost__Date">
                  {format(new Date(posts[0].createdAt), "dd/MM/yyyy HH:mm")}
                </time>
              </p>
              <p className="MainPost__Description">{posts[0].summary}</p>
            </div>
          </div>
        )}
      </div>
      <div className="MainBanner">
        <button className="MainBanner__Button">Breaking News</button>
        <p className="MainBanner__Text">
          Kanye West says he's running for president in 2024
        </p>
      </div>
      <div className="IndexPage__Posts">
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </div>

      <div className="ViewMore">
        <button className="ViewMore__Button">View More</button>
      </div>
    </div>
  );
};

export default Index;
