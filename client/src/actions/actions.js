import * as types from './types';

export const setErrors = payload => ({ type: types.SET_ERRORS, payload });
export const setCurrentUser = payload => ({ type: types.SET_CURRENT_USER, payload });
export const getProfiles = payload => ({ type: types.GET_PROFILES, payload });
export const getProfile = payload => ({ type: types.GET_PROFILE, payload });
export const profileLoading = payload => ({ type: types.PROFILE_LOADING, payload });
export const profileNotFound = payload => ({ type: types.PROFILE_NOT_FOUND, payload });
export const clearCurrentProfile = payload => ({ type: types.CLEAR_CURRENT_PROFILE, payload });
export const postLoading = payload => ({ type: types.POST_LOADING, payload });
export const getPosts = payload => ({ type: types.GET_POSTS, payload });
export const getPost = payload => ({ type: types.GET_POST, payload });
export const addPost = payload => ({ type: types.ADD_POST, payload });
export const deletePost = payload => ({ type: types.DELETE_POST, payload });
