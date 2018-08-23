import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
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
    } = this.props;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addPost(newPost);
    this.setState({ text: '' });
  };
  render() {
    const { errors, ...data } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                name="text"
                onChange={this.onChange}
                value={data.text}
                placeholder="Create a post"
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

const mapDispatchToProps = { addPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostForm);
