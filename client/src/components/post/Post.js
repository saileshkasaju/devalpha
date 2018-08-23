import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
  static propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
  };
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.id);
  };

  render() {
    const {
      post: { post, loading },
    } = this.props;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
});

const mapDispatchToProps = { getPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
