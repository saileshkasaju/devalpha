import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = props => {
  const { posts } = props;
  return (
    <div className="posts">
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostFeed;
