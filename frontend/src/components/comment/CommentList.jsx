import React from 'react';
import CommentItem from './CommentItem.jsx';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-base-content/80">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;