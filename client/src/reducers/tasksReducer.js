import { SET_TASKS, SET_PAGE, SET_SORTBY, SET_FETCHING_STATUS, EDIT_TASK, CREATE_TASK } from '../actions/actionTypes';

const initialState = {
  tasks: [],
  sortby: '',
  totalTaskCount: 0,
  page: 1,
  fetching: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.data.tasks,
        totalTaskCount: action.data.totalTaskCount
      }

    case SET_SORTBY:
      return {
        ...state,
        sortby: action.sortby
      }

    case CREATE_TASK:
      return {
        ...state,
        tasks: [action.task, state.tasks[0], state.tasks[1]],
        totalTaskCount: ++state.totalTaskCount
      }

    case SET_FETCHING_STATUS:
      return {
        ...state,
        fetching: action.fetching
      }

    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }

    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.task.id) {
            task.text = action.task.text;
            task.status = action.task.status;
          }
          return task;
        })
      }

    default:
      return state;
  }
}
