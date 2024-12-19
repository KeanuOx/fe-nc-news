import React, { useState } from "react";
import { deleteComment } from "../api";

const CommentCard = ({ comment, setComments }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setComments((prevComments) =>
      prevComments.filter((c) => c.comment_id !== comment.comment_id)
    );

    deleteComment(comment.comment_id)
      .then(() => {
        setIsDeleting(false);
      })
      .catch(() => {
        setComments((prevComments) => [comment, ...prevComments]);
        setIsDeleting(false);
      });
  };

  return (
    <div className="comment-card">
      <p>
        <strong>{comment.author}</strong> says:
      </p>
      <p>{comment.body}</p>
      <p>
        🗓 {new Date(comment.created_at).toLocaleDateString()} | 👍 {comment.votes} Votes
      </p>
      {comment.author === "current_user" && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};

export default CommentCard;