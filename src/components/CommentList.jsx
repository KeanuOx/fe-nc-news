import React, { useEffect, useState } from "react";
import { getCommentsByArticleId, postComment } from "../api";
import CommentCard from "./CommentCard";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    setIsSubmitting(true);

    postComment(article_id, { body: commentText, username: "current_user" })
      .then((newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
        setCommentText("");
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Error loading comments.</p>;

  return (
    <div className="comments-container">
      <form onSubmit={handleAddComment} className="comment-form">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;