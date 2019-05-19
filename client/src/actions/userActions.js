import { SET_USER, SET_ERRORS, SET_ACTIVE_BAR } from './actionTypes';

export const signIn = (userData) => dispatch => {
  if (userData.username !== 'admin') {
      dispatch({
        type: SET_USER,
        userData: userData
      })
    }
  else if (userData.password === '123') {
      dispatch({
        type: SET_USER,
        userData: { username: userData.username, email: userData.email }
      })
    }
}

export const setActiveBar = (activeBar) => dispatch => {
  dispatch({
    type: SET_ACTIVE_BAR,
    activeBar
  })
}
