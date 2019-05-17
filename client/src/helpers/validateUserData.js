export const validateUserData = (username, email, password) => {
  var errors = [];
  if (username && email && password) {
    if (username.length < 3 || username.length > 30) {
      (username.length < 3) ?
      errors.push({key: 'username', text: 'Минимальная длина имени пользователя - 3 символа'}) :
      errors.push({key: 'username', text: 'Максимальная длина имени пользователя - 30 символов'})
    }
    if (password.length == 0) {
      errors.push({key: 'username', text: 'Минимальная длина пароля - 1 символ'})
    }
    if (email.length > 255) {
      errors.push({key: 'email', text: 'Максимальная длина поля email - 255 символов'})
    }
    else if (!(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/).test(email)) {
      errors.push({key: 'email', text: 'Неверный формат'})
    };
  }
  return errors;
}
