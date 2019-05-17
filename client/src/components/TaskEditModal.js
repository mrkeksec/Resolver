import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTask } from '../actions/tasksActions';

import settings from '../icons/loader.svg';

class TaskEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.task.text,
      status: this.props.task.status
    }

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeText(e) {
    this.setState({text : e.target.value});
  }

  onChangeStatus() {
    this.setState({status: this.state.status === 10 ? 0 : 10});
  }

  onCancel() {
    this.setState({
      text: this.props.task.text,
      status: this.props.task.status
    });
  }

  onSave(taskId, editedText, editedStatus) {
    this.props.editTask(taskId, editedText, editedStatus);
  }

  render() {
    return (
      <>
        {
        ((this.props.task.username === this.props.username) || (this.props.username === 'admin'))  ?
        (<>
          <div className="settings-but">
            <img src={settings} className="settings-icon" data-toggle="modal" data-target={`#edit-task-${this.props.task.id}`} alt="settings-icon"/>
          </div>
          <div className="modal fade" id={`edit-task-${this.props.task.id}`} tabindex="-1" role="dialog" aria-labelledby="EditModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="EditModalLabel">Редактировать</h5>
                <button type="button" className="close" data-dismiss="modal" onClick={this.onCancel} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="task-elem">
                <textarea className="edit-text" onChange={this.onChangeText} name="text" value={this.state.text}/>
                </div>
                {
                  this.state.status === 10 ? (
                    <div className="edit-status-2 task-elem" id={"status-editor-" + this.props.task.id} onClick={this.onChangeStatus}>
                      Решено
                    </div>
                ) :
                (
                  <div className="edit-status-1 task-elem" id={"status-editor-" + this.props.task.id} onClick={this.onChangeStatus}>
                    Не решено
                  </div>
                )
              }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onCancel}>Закрыть</button>
                <button type="button" className="btn save-but" data-dismiss="modal" onClick={() => this.onSave(this.props.task.id, this.state.text, this.state.status)}>
                Сохранить
                </button>
              </div>
            </div>
          </div>
          </div>
        </>) :
        (<></>)
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  username: state.user.username
})

export default connect(mapStateToProps, { editTask })(TaskEditModal);
