import React, { useEffect, useState } from "react";
import "./PostPage.scss";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

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
