import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
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
      <Link to={`/articles/${article.article_id}`} className="read-more-button">
        Read More
      </Link>
    </div>
  );
};

export default ArticleCard;