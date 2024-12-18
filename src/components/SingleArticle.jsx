import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import CommentList from "./CommentList";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (isError) return <p>Error loading article.</p>;

  return (
    <div className="single-article">
      <h2>{article.title}</h2>
      <p>By {article.author}</p>
      <p>{new Date(article.created_at).toLocaleDateString()}</p>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-image"
      />
      <p>{article.body}</p>
      <p>👍 Votes: {article.votes}</p>

      <h3>Comments</h3>
      <CommentList article_id={article_id} />
    </div>
  );
};

export default SingleArticle;