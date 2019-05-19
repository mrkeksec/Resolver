import { SET_TASKS, SET_FETCHING_STATUS, CREATE_TASK, EDIT_TASK } from './actionTypes';
import $ from "jquery";
import md5 from "md5";

export const fetchTasks = (data) => dispatch => {
  dispatch({
    type: SET_FETCHING_STATUS,
    fetching: true
  });

  var searchParameterStr;
  if (data.payload.sortby) {
    searchParameterStr = `page=${data.payload.page}&${data.type}=${data.payload.sortby}`;
  }
  else {
    searchParameterStr = `${data.type}=${data.payload}`;
  }

  $.ajax({
    url: `https://uxcandy.com/~shapoval/test-task-backend/?developer=Nazarov&${searchParameterStr}`,
    crossDomain: true,
    method: 'GET',
    success: function(data) {
        if (data.status === 'ok') {
          dispatch({
            type: SET_TASKS,
            data: {
              tasks: data.message.tasks,
              totalTaskCount: data.message.total_task_count
            }
          });
          dispatch({
            type: SET_FETCHING_STATUS,
            fetching: false
          });
        }
        else {
          throw new Error(400);
        }
    }
  })
}

export const createTask = (username, email, text) => dispatch => {
  var form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("text", text);

  $.ajax({
      url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=Nazarov',
      crossDomain: true,
      method: 'POST',
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json",
      success: function(data) {
          if (data.status === 'ok') {
            dispatch({
              type: CREATE_TASK,
              task: data.message
            })
          }
          else {
            throw new Error(400);
          }
      }
  })
}

export const editTask = (taskId, editedText, editedStatus) => dispatch => {
  const params_string = [
      { name: 'status', payload: editedStatus },
      { name: 'text', payload: editedText },
      { name: 'token', payload: "beejee" }
    ]
    .sort((a, b) => a.name > b.name)
    .map((elem) => `${encodeURIComponent(elem.name)}=${encodeURIComponent(elem.payload)}`)
    .join('&');

  var form = new FormData();
  form.append("text", editedText);
  form.append("status", editedStatus);
  form.append("token", "beejee");
  form.append("signature", md5(params_string));

  $.ajax({
    url: `https://uxcandy.com/~shapoval/test-task-backend/edit/${taskId}?developer=Nazarov`,
    crossDomain: true,
    method: 'POST',
    mimeType: "multipart/form-data",
    contentType: false,
    processData: false,
    data: form,
    dataType: "json",
    success: function(data) {
        if (data.status === 'ok') {
          dispatch({
            type: EDIT_TASK,
            task: {
              id: taskId,
              text: editedText,
              status: editedStatus
            }
          })
        }
        else {
          throw new Error(400);
        }
    }
  })
}

export const setPage = (page) => dispatch => {
  dispatch({
    type: 'SET_PAGE',
    page: Number(page)
  })
}
