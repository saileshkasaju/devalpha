import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
  };
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${comment.user}`}>
              <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt={comment.name} />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id && (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={() => this.onDeleteClick(postId, comment._id)}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { deleteComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentItem);
