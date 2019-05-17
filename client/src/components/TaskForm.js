import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions/tasksActions';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      button: 'Добавить задачу'
    };

    this.onChange = this.onChange.bind(this);
    this.onButtonChange = this.onButtonChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.setState({ text: '' })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onButtonChange() {
    const node = document.getElementById("kek-but");
    if (this.state.button === 'Добавить задачу') {
      this.setState({
      button: 'Отмена',
    })
    if (node) {
      node.disabled = true;
    }
  }
    else {
      this.setState({
        button: 'Добавить задачу',
      });
      if (node) {
        node.disabled = true;
      }
    }
    setTimeout(() => {
      if (node) {
        node.disabled = false;
      } }, 400
     )
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createTask(this.props.username, this.props.email, this.state.text);
    this.setState({text: ''});
    this.onButtonChange();
  }

  render() {
    return(
      <div class="task-form">
        <button id='kek-but' class="btn cool-but add-task-but" onClick={this.onButtonChange} data-toggle="collapse" type="button" data-target="#taskform" aria-expanded="false" aria-controls="collapseExample">
        {this.state.button}
        </button>
        <form encType="multipart/form-data" id="taskform" class="collapse" onSubmit={this.onSubmit}>
          <div className="form-group taskform-elem">
          <label for="login">Напишите текст задачи: </label>
          <textarea name="text" value={this.state.text} onChange={this.onChange} />
          </div>
          <button type="submit" class="btn cool-but add-task-but" data-toggle="collapse" data-target="#taskform">Добавить</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  email: state.user.email
})

export default connect(mapStateToProps, { createTask })(TaskForm);
