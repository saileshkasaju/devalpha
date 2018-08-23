import axios from 'axios';
import * as actions from './actions';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(actions.profileLoading());
  axios
    .get('/api/profile')
    .then(res => dispatch(actions.getProfile(res.data)))
    .catch(err => dispatch(actions.getProfile({})));
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(actions.profileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch(actions.getProfile(res.data)))
    .catch(err => dispatch(actions.getProfile(null)));
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(actions.setErrors(err.response.data)));
};

// Delete education
export const deleteEducation = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res => dispatch(actions.getProfile(res.data)))
      .catch(err => dispatch(actions.setErrors(err.response.data)));
  }
};

// Delete experience
export const deleteExperience = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res => dispatch(actions.getProfile(res.data)))
      .catch(err => dispatch(actions.setErrors(err.response.data)));
  }
};

// Delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => dispatch(actions.setCurrentUser({})))
      .catch(err => dispatch(actions.setErrors(err.response.data)));
  }
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(actions.profileLoading());
  axios
    .get('/api/profile/all')
    .then(res => dispatch(actions.getProfiles(res.data)))
    .catch(err => dispatch(actions.getProfiles(null)));
};
