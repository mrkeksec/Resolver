import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { signIn, setActiveBar } from '../actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      email: '',
      password: '',
      redirect: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.setState({redirect: true});
    }
  }

  componentWillUnmount() {
    if (this.state.redirect) {
      this.props.setActiveBar('tasks');
      document.getElementById('tasks').classList.add('active');
      document.getElementById('login').classList.remove('active');
    }
    this.setState({
      login: '',
      email: '',
      password: '',
      redirect: false
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    this.props.signIn(userData);
  }

  render() {
    return  this.state.redirect ? <Redirect to="/" /> :
     (
      <div className = "login-form">
      <form  onSubmit={this.onSubmit}>
      <div className="form-group mb-2">
        <label for="login">Логин: </label>
        <input type="text" className="form-control user-input" name="username" placeholder="Введите логин" onChange={this.onChange} />
      </div>
      <div className="form-group" id="email">
        <label for="email">Email: </label>
        <input type="email" name="email" className="form-control user-input" value={this.state.email} aria-describedby="emailHelp" placeholder="Введите email"onChange={this.onChange} />
      </div>
      <div className="form-group">
        <label for="password">Пароль: </label>
        <input type="password" className="form-control user-input" name="password" placeholder="Введите пароль" onChange={this.onChange} />
      </div>
      <button type="submit" className="btn mb-2 cool-but move-top-but">Вход</button>
    </form>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.user.username
})

export default connect(mapStateToProps, { signIn, setActiveBar })(Login);
