import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes, getCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ])
      .then(([articleData, commentsData]) => {
        setArticle({ ...articleData.article, comments: commentsData });
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (incVotes) => {
    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + incVotes,
    }));
    setError(null);

    patchArticleVotes(article_id, incVotes).catch(() => {
      setArticle((currentArticle) => ({
        ...currentArticle,
        votes: currentArticle.votes - incVotes,
      }));
      setError("Error!");
    });
  };

  if (isLoading) return <p>Loading...</p>;
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
      <p>
        👍 Votes: {article.votes}
        <button onClick={() => handleVote(1)}>+1</button>
        <button onClick={() => handleVote(-1)}>-1</button>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Comments</h3>
      <div className="comments-container">
        {article.comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default SingleArticle;