import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id)
    ])
      .then(([articleData, commentsData]) => {
        setArticle(articleData.article);
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

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
      <p>👍 {article.votes} Votes</p>
      <h3>Comments</h3>
      <div className="comments-container">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default SingleArticle;