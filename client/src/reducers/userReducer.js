import { SET_USER, SET_ERRORS, SET_ACTIVE_BAR, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = {
  email: '',
  username: '',
  errors: [],
  activeBar: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.userData.email,
        username: action.userData.username
      }

    case SET_ACTIVE_BAR:
      return {
        ...state,
        activeBar: action.activeBar
      }

    case SET_ERRORS:
      return {
        ...state,
        errors: action.errors
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      }

    default:
      return state;
  }
}
