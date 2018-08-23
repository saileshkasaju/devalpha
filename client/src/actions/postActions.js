import axios from 'axios';
import * as actions from './actions';

// Add Post
export const addPost = postData => dispatch => {
  dispatch(actions.setErrors({}));
  axios
    .post('/api/posts', postData)
    .then(res => dispatch(actions.addPost(res.data)))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(actions.postLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch(actions.getPosts(res.data)))
    .catch(err => dispatch(actions.getPosts(null)));
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => dispatch(actions.deletePost(id)))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(actions.postLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch(actions.getPost(res.data)))
    .catch(err => dispatch(actions.getPost(null)));
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(actions.setErrors({}));
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch(actions.getPost(res.data)))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch(actions.getPost(res.data)))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};
