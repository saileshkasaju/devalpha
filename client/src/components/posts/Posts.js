import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const {
      post: { posts, loading },
      auth: { isAuthenticated },
    } = this.props;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{isAuthenticated && <PostForm />}</div>
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
});

const mapDispatchToProps = { getPosts };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
