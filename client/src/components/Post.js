import React from "react";
import "./Post.scss";

const Post = () => {
  return (
    <div className="Post">
      <img
        className="Post__Image"
        src="https://files.tecnoblog.net/wp-content/uploads/2021/06/windows-11-microsoft-teams-340x191.jpg"
        alt="Post image"
      />
      <div className="Post__Summary">
        <h2 className="Post__Title">Microsoft vai remover chat do Teams</h2>
        <p className="Post__Info">
          <a href="#" className="Post__Author">
            Robson Melo
          </a>
          <time className="Post__Date">15/05/2023 às 17:20</time>
        </p>
        <p className="Post__Description">
          Dificuldade de foco pode prejudicar a qualidade da imagem, resultando
          em fotos embaçadas; veja como melhorar a nitidez ao fotografar e
          filmar com a câmera do seu celular
        </p>
      </div>
    </div>
  );
};

export default Post;
