import axios from 'axios';
import { setCurrentUser } from './authActions';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_ERRORS } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

// Delete education
export const deleteEducation = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res => dispatch(getProfile(res.data)))
      .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
  }
};

// Delete experience
export const deleteExperience = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res => dispatch(getProfile(res.data)))
      .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
  }
};

// Delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => dispatch(setCurrentUser({})))
      .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
  }
};

// Profile loading
export const setProfileLoading = () => ({ type: PROFILE_LOADING });

// Clear profile
export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

// Get profile
export const getProfile = payload => ({ type: GET_PROFILE, payload });
