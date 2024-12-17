import React from "react";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div className="article-card">
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-image"
      />
      <h3>{article.title}</h3>
      <p>By {article.author}</p>
      <p>{new Date(article.created_at).toLocaleDateString()}</p>
      <p>Comments: {article.comment_count}</p>
      <p>👍 {article.votes} Votes</p>
      <button
        onClick={() => navigate(`/articles/${article.article_id}`)}
        className="read-more-button"
      >
        Read More
      </button>
    </div>
  );
};

export default ArticleCard;