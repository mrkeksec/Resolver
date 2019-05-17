import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/tasksActions';
import { setActiveBar } from '../actions/userActions';

import logo from '../icons/logo.png';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortby: 'username',
    }

    this.setActiveBar = this.setActiveBar.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const activeBar = (window.location.href.indexOf('login') === -1) ? 'tasks' : 'login';
    document.getElementById(activeBar).classList.add('active');
    this.props.setActiveBar(activeBar);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  setActiveBar() {
    if (this.props.activeBar === 'tasks') {
      document.getElementById('login').classList.add('active');
      document.getElementById('tasks').classList.remove('active');
      this.props.setActiveBar('login')
    }
    else {
      document.getElementById('tasks').classList.add('active');
      document.getElementById('login').classList.remove('active');
      this.props.setActiveBar('tasks')
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.fetchTasks({ type: 'sort_field', payload: this.state.sortby });
  }

  render() {
    return (<nav class="navbar fixed-top navbar-expand-lg navbar-light tasks-navbar">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="navbar-brand navl">Resolver</div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" id="tasks" name="tasks" onClick={this.setActiveBar}>
              <Link class="nav-link" to="/">Задачи</Link>
            </li>
            <li class="nav-item" id="login" name="login" onClick={this.setActiveBar}>
              <Link class="nav-link" to="/login">Вход</Link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
            <div class="input-group lol">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Сортировка по:</label>
              </div>
              <select class="custom-select" name="sortby" onChange={this.onChange} id="inputGroupSelect01">
                <option selected value="username">Имени</option>
                <option value="email">Email</option>
                <option value="status">Статусу</option>
              </select>
            </div>
            <button class="btn search-submit my-2 my-sm-0" type="submit">Сортировать</button>
          </form>
        </div>
        </nav>)
      }
}

const mapStateToProps = state => ({
  activeBar: state.user.activeBar
})

export default connect(mapStateToProps, { fetchTasks, setActiveBar })(Navbar);
