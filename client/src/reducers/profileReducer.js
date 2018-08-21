import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from '../actions/types';
// import isEmpty from '../validations/isEmpty';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
