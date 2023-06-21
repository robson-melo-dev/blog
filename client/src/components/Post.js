import React from "react";
import "./Post.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, content, createdAt, author, _id }) => {
  return (
    <div className="Post">
      <Link to={`/post/${_id}`}>
        <img
          className="Post__Image"
          src={"http://localhost:4000/" + cover}
          alt="Post image"
        />
      </Link>
      <div className="Post__Summary">
        <Link to={`/post/${_id}`}>
          <h2 className="Post__Title">{title}</h2>
        </Link>
        <p className="Post__Info">
          <a href="#" className="Post__Author">
            {author.username}
          </a>
          <time className="Post__Date">
            {format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
          </time>
        </p>
        <p className="Post__Description">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
