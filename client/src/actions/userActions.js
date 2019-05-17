import { SET_USER, SET_ERRORS, SET_ACTIVE_BAR } from './actionTypes';
import { validateUserData } from '../helpers/validateUserData';

export const signIn = (userData) => dispatch => {
  const errors = validateUserData(userData);
  if (errors.length === 0) {
  if (userData.username !== 'admin') {
      dispatch({
        type: SET_USER,
        userData: userData
      })
    }
    else {
      if (userData.password === '123') {
        dispatch({
          type: SET_USER,
          userData: { username: userData.username, email: userData.email }
        })
      }
      else {
        dispatch({
          type: SET_ERRORS,
          errors: ['Неверный пароль']
        })
      }
    }
  }
  else {
    dispatch({
      type: SET_ERRORS,
      errors
    })
  }
}

export const setActiveBar = (activeBar) => dispatch => {
  dispatch({
    type: SET_ACTIVE_BAR,
    activeBar
  })
}
