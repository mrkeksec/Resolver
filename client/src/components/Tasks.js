import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, editTask } from '../actions/tasksActions';

import TaskEditModal from './TaskEditModal';
import Paginator from './Paginator';

import loader from '../icons/loader.svg';

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTasks({ type: 'page', payload: this.props.page });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.fetchTasks({ type: 'page', payload: nextProps.page });
    }
  }

  render() {
    const taskElements = this.props.tasks.map(task => (
      <div className="task" key={task.id}>
        <div className="task-creator-info">
          {task.username} | {task.email}
        </div>
        <div className="task-text">
          {task.text}
        </div>
          <div className="common-container">
          <div className="task-status-container">
          {
          task.status === 10 ? <div className="edit-status-2 task-status">Решено</div> :
          <div className="edit-status-1 task-status">Не решено</div>
          }
          </div>
        <TaskEditModal task={task}/>
        </div>
    </div>
    ))

    return this.props.fetching ? (
      <div className="loader-container app-header">
        <img src={loader} className="loader" alt="loader-icon"/>
      </div>
      ) :
      (
        this.props.tasks.length > 0 ?
        <>
        <div className="tasks app-header">
          {taskElements}
        </div>
        <Paginator />
        </> :
        <div className='for-tasks'>
          К сожалению, мы не нашли ни одной задачи.<br />Попробуйте добавить задачу или перезагрузить страницу.
        </div>
      )
  }
}

const mapStateToProps = state => ({
  tasks: state.data.tasks,
  fetching: state.data.fetching,
  page: state.data.page
})

export default connect(mapStateToProps, { fetchTasks, editTask })(Tasks);
