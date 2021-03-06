import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentFeed = props => {
  const { comments, postId } = props;
  return (
    <div className="comments">
      {comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentFeed;
