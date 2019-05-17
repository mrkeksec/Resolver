import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tasks from './Tasks';
import TaskForm from './TaskForm';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        {this.props.username ? <TaskForm /> : <></>}
        <Tasks />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.user.username
})

export default connect(mapStateToProps)(Layout);
