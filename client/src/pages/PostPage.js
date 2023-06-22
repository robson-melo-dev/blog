import React, { useContext, useEffect, useState } from "react";
import "./PostPage.scss";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../components/Context/UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="PostPage">
      <h1 className="PostPage__Title">{postInfo.title}</h1>
      <time className="PostPage__Date">
        {format(new Date(postInfo.createdAt), "dd/MM/yyyy HH:mm")}
      </time>
      <div className="PostPage__Author">By: @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="PostPage__Edit">
          <Link to={`/edit/${postInfo._id}`} className="PostPage__Edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="PostPage__Image">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
