export const clearErrors = (errorsNames) => {
  errorsNames.forEach(name => {
    var parentNode = document.getElementById(name);
    var childNode = document.getElementById(name+'-error');
    if (childNode) {
    parentNode.removeChild(childNode);
    }
  })
}

export const setErrors = (errors) => {
  errors.forEach(error => {
  var errorElement = document.createElement('div');
  errorElement.setAttribute('class', 'error');
  errorElement.setAttribute('id', error.key + '-error');
  errorElement.innerHTML = error.text;
  document.getElementById(error.key).appendChild(errorElement);
  })
}

const validateElement = (type, data) => {
  let key = type;
  let text = '';
  if (!data) {
    text = 'Поле является обязательным для заполнения';
    return { key, text }
  }
  switch(type) {
    case 'username': {
      if (data.length < 3) {
        text = 'Минимальная длина имени пользователя - 3 символа';
      }
      else if (data.length > 30) {
        text = 'Максимальная длина имени пользователя - 30 символов';
      }
      break;
    }
    case 'password': {
      if (data.length > 100) {
        text = 'Максимальная длина пароля - 100 символов';
      }
      break;
    }
    case 'email': {
      if (data.length > 255) {
        text = 'Максимальная длина поля email - 255 символов';
      }
      else if (!(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/).test(data)) {
        text = 'Неверный формат';
      }
      break;
    }
    case 'task': {
      if (data.length > 1500) {
        text = 'Максимальная длина задачи - 1500 символов';
      }
      else if (data.length < 1) {
        text = 'Минимальная длина задачи - 1 символ'
      }
      break;
    }
  }
  return { key, text }
}

export const validateForm = (type, data) => {
  var errors = [];
  if (type === 'login') {
    errors.push(validateElement('username', data.username));
    if (data.username !== 'admin') {
      errors.push(validateElement('email', data.email));
    }
    errors.push(validateElement('password', data.password));
  }
  else if (type === 'loggedUserTask') {
    errors.push(validateElement('task', data.task));
  }
  else if (type === 'userTask') {
    errors.push(validateElement('username', data.username));
    if (data.username !== 'admin') {
      errors.push(validateElement('email', data.email));
    }
    else {
      errors.push({ key: 'username', text: 'Необходимо выполнить вход как администратор' });
    }
    errors.push(validateElement('task', data.task));
  }
  return errors.filter(elem => elem.text ? true: false);
}
