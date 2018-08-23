import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const {
      auth: { user },
      postId,
    } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addComment(postId, newComment);
    this.setState({ text: '' });
  };
  render() {
    const { errors, ...data } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a comment...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                name="text"
                onChange={this.onChange}
                value={data.text}
                placeholder="Reply to post"
                error={errors.text}
              />
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = { addComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentForm);
