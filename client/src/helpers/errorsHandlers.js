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

export const validateUserData = (username, email, password) => {
  var errors = [];
  if (username) {
    if (username.length < 3 || username.length > 30) {
      (username.length < 3) ?
      errors.push({key: 'username', text: 'Минимальная длина имени пользователя - 3 символа'}) :
      errors.push({key: 'username', text: 'Максимальная длина имени пользователя - 30 символов'})
    }
  }
  else {
    errors.push({key: 'username', text: 'Минимальная длина имени пользователя - 3 символа'});
  }

  if (password) {
    if (password.length > 100) {
      errors.push({key: 'password', text: 'Максимальная длина пароля - 100 символов'})
    }
  }
  else {
    errors.push({key: 'password', text: 'Минимальная длина пароля - 1 символ'})
  }

  if (email) {
    if (email.length > 255) {
      errors.push({key: 'email', text: 'Максимальная длина поля email - 255 символов'})
    }
    else if (!(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/).test(email)) {
      errors.push({key: 'email', text: 'Неверный формат'})
    };
  }
  else {
    errors.push({key: 'email', text: 'Минимальная длина поля email - 5 символов'})
  }
  return errors;
}
