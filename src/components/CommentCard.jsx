import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <p><strong>{comment.author}</strong> says:</p>
      <p>{comment.body}</p>
      <p>🗓 {new Date(comment.created_at).toLocaleDateString()} | 👍 {comment.votes} Votes</p>
    </div>
  );
};

export default CommentCard;